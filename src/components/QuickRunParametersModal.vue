<template>
  <p-modal v-model:showModal="internalShowModal" class="quick-run-parameters-modal-v2" title="Run Deployment">
    <p-content>
      <div class="quick-run-parameters-modal-v2__header">
        <h3>{{ localization.info.parameters }}</h3>
        <p-icon-button-menu small>
          <p-overflow-menu-item v-if="kind === 'json'" label="Use form input" @click="kind = 'none'" />
          <p-overflow-menu-item v-if="kind === 'none'" label="Use JSON input" @click="kind = 'json'" />
        </p-icon-button-menu>
      </div>

      <SchemaFormV2 :id="formId" v-model:values="parameters" :schema="deployment.parameterOpenApiSchemaV2" :kinds="['json']" @submit="submit" />
    </p-content>

    <template #actions>
      <slot name="actions">
        <p-button type="submit" primary :form="formId">
          Run
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { PButton, randomId, showToast } from '@prefecthq/prefect-design'
  import { computed, h, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ToastFlowRunCreate } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment, DeploymentFlowRunCreateV2 } from '@/models'
  import { SchemaFormV2, SchemaValuesV2 } from '@/schemas'
  import { usePrefectKind } from '@/schemas/compositions/usePrefectKind'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    showModal: boolean,
    deployment: Deployment,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()
  const formId = randomId()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const parameters = ref<SchemaValuesV2>({ ...props.deployment.parametersV2 })
  const { kind } = usePrefectKind(parameters)

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  async function submit(): Promise<void> {
    const values: DeploymentFlowRunCreateV2 = {
      state: {
        type: 'scheduled',
        message: 'Run from the Prefect UI',
      },
      parameters: parameters.value,
    }

    try {
      const flowRun = await api.deployments.createDeploymentFlowRunV2(props.deployment.id, values)

      const toastMessage = h(ToastFlowRunCreate, { flowRun, flowRunRoute: routes.flowRun, router, immediate: true })
      showToast(toastMessage, 'success')
    } catch (error) {
      const message = getApiErrorMessage(error, localization.error.scheduleFlowRun)
      showToast(message, 'error')
      console.error(error)
    }

    internalShowModal.value = false
  }
</script>

<style>
.quick-run-parameters-modal-v2__header { @apply
  flex
  items-center
  justify-between
}
</style>