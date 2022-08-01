<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" title="Run">
    <p-content>
      <h3 class="run-form__section-header">
        When?
      </h3>

      <p-button-group v-model="nowOrLater" :options="nowOrLaterOptions" size="sm" />

      <template v-if="nowOrLater == 'later'">
        <p-label label="Date">
          <p-date-input v-model="date" show-time />
        </p-label>
      </template>
    </p-content>

    <p-divider v-if="deployment.parameters" />

    <p-content v-if="deployment.parameters">
      <h3 class="run-form__section-header">
        Parameters
      </h3>

      <PydanticForm v-model="parameters" hide-footer :pydantic-schema="deployment.parameterOpenApiSchema" />
    </p-content>

    <template #actions>
      <p-button type="submit" :disabled="disabled" @click="submit">
        Run {{ parametersHaveBeenModified ? '' : 'with default parameters' }}
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import  { PButton, showToast, ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useField } from 'vee-validate'
  import { ref, h, computed } from 'vue'
  import { RouteLocationRaw, useRouter } from 'vue-router'
  import PydanticForm from './PydanticForm.vue'
  import RunButtonToastMessage from './RunButtonToastMessage.vue'
  import { useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { flowRunRouteKey } from '@/router/routes'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const initialValues = { ...props.deployment.parameters ?? {} }
  const initialTypes: Record<keyof typeof initialValues, string> = { }

  Object.keys(initialValues).forEach((key: keyof typeof initialValues) => {
    const parameter = initialValues[key]
    if (typeof parameter == 'string' && Date.parse(parameter)) {
      initialValues[key] = new Date(parameter)
    }

    initialTypes[key] = typeof parameter
  })

  const { showModal, open, close } = useShowModal()
  const can = inject(canKey)
  const deploymentsApi = inject(deploymentsApiKey)
  const loading = ref(false)
  const date = ref(new Date())
  const { value: parameters } = useField<Record<string, unknown>>('parameters', undefined, { initialValue: initialValues })
  const nowOrLater = ref('now')
  const nowOrLaterOptions: ButtonGroupOption[] = [{ label: 'Now', value: 'now' }, { label: 'Later...', value: 'later' }]


  const flowRun = ref()

  const disabled = computed(() => {
    return can.create.flow_run
  })

  const router = useRouter()
  const flowRunRoute = inject(flowRunRouteKey)

  const parametersHaveBeenModified = computed(() => {
    return JSON.stringify(props.deployment.parameters) !== JSON.stringify(parameters.value)
  })

  const submit = async (deployment: Deployment): Promise<void> => {
    loading.value = true

    try {
      flowRun.value = await deploymentsApi.createDeploymentFlowRun(deployment.id, {
        parameters: {},
        tags: [],
        state: {
          type: 'scheduled',
          message: 'Run through UI',
        },
      },
      )
      const runRoute: RouteLocationRaw = flowRunRoute(flowRun.value.id)
      const toastMessage = h(RunButtonToastMessage, { flowRun: flowRun.value, flowRunRoute: runRoute, routerProp:router })
      showToast(toastMessage, 'success')
    } catch (error) {
      showToast(localization.error.scheduleFlowRun, 'error')
      console.warn(error)
    } finally {
      loading.value = false
    }
  }
</script>

<style>
.run-form__section-header {
  @apply
  text-lg
  font-semibold
}
</style>

