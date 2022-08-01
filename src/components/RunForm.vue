<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" title="Run" class="run-form">
    <p-content>
      <h3 class="run-form__section-header">
        Name
      </h3>

      <p-text-input v-model="name">
        <template #prepend>
          <p-button
            class="run-form__random-name-button"
            color="primary"
            icon="RefreshIcon"
            @click="name = generateRandomName()"
          />
        </template>
      </p-text-input>
    </p-content>

    <p-divider v-if="deployment.parameters" />

    <p-content>
      <h3 class="run-form__section-header">
        Start
      </h3>

      <p-button-group v-model="nowOrLater" :options="nowOrLaterOptions" size="sm" />

      <template v-if="nowOrLater == 'later'">
        <p-label label="Date">
          <p-date-input v-model="start" show-time />
        </p-label>
      </template>
    </p-content>

    <p-divider v-if="deployment.parameters" />

    <p-content v-if="deployment.parameters">
      <h3 class="run-form__section-header">
        Parameters
      </h3>

      <p-button-group v-model="useParameters" :options="useParametersOptions" size="sm" />

      <template v-if="useParameters == 'custom'">
        <PydanticForm v-model="parameters" hide-footer :pydantic-schema="deployment.parameterOpenApiSchema" />
      </template>
    </p-content>

    <template #actions>
      <p-button type="submit" :disabled="disabled" @click="submit">
        Run {{ useParameters == 'custom' ? '(custom)' : '' }}
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
  import { mocker } from '@/services'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const generateRandomName = (): string => {
    return mocker.create('runName')
  }

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
  const start = ref(new Date())
  const name = ref(generateRandomName())
  const { value: parameters } = useField<Record<string, unknown>>('parameters', undefined, { initialValue: initialValues })
  const nowOrLater = ref('now')
  const nowOrLaterOptions: ButtonGroupOption[] = [{ label: 'Now', value: 'now' }, { label: 'Later', value: 'later' }]

  const useParameters = ref('default')
  const useParametersOptions: ButtonGroupOption[] = [{ label: 'Default', value: 'default' }, { label: 'Custom', value: 'custom' }]
  const computedParameters = computed(() => {
    return useParameters.value == 'custom' ? parameters.value : props.deployment.parameters
  })

  const flowRun = ref()

  const disabled = computed(() => {
    return can.create.flow_run
  })

  const router = useRouter()
  const flowRunRoute = inject(flowRunRouteKey)

  const submit = async (deployment: Deployment): Promise<void> => {
    loading.value = true

    try {
      flowRun.value = await deploymentsApi.createDeploymentFlowRun(deployment.id, {
        name: name.value,
        parameters: computedParameters.value,
        tags: [],
        state: {
          type: 'scheduled',
          message: 'Run through UI',
          scheduledTime: start.value,
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
.run-form {
  min-width: 850px;
}

.run-form__random-name-button { @apply
  rounded-none
  rounded-tl
  rounded-bl
}

.run-form__section-header {
  @apply
  text-lg
  font-semibold
}
</style>

