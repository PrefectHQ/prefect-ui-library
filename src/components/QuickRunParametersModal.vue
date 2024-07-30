<template>
  <p-modal v-model:showModal="showModal" class="quick-run-parameters-modal-v2" title="Run Deployment">
    <SchemaFormV2
      :id="formId"
      v-model:values="parameters"
      v-model:loading="loading"
      :schema="deployment.parameterOpenApiSchema"
      :validate="enforceParameterSchema"
      :kinds="['json', 'workspace_variable']"
      @submit="submit"
    >
      <template #default="{ kind, setKind }">
        <div class="quick-run-parameters-modal-v2__header">
          <h3>{{ localization.info.parameters }}</h3>
          <p-icon-button-menu small>
            <p-overflow-menu-item v-if="kind === 'json'" label="Use form input" @click="setKind('none')" />
            <p-overflow-menu-item v-if="kind === 'none'" label="Use JSON input" @click="setKind('json')" />
          </p-icon-button-menu>
        </div>
      </template>

      <template #after-content>
        <p-checkbox v-model="enforceParameterSchema" label="Validate parameters" />
      </template>
    </SchemaFormV2>

    <template #actions>
      <slot name="actions">
        <p-button type="submit" :disabled="loading" primary :form="formId">
          Run
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { PButton, randomId, showToast } from '@prefecthq/prefect-design'
  import { h, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ToastFlowRunCreate } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment, DeploymentFlowRunCreate } from '@/models'
  import { SchemaFormV2, SchemaValuesV2 } from '@/schemas'
  import { getApiErrorMessage } from '@/utilities/errors'

  const showModal = defineModel<boolean>('showModal', { required: true })

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()
  const formId = randomId()
  const loading = ref(false)
  const enforceParameterSchema = ref(props.deployment.enforceParameterSchema)
  const parameters = ref<SchemaValuesV2>({ ...props.deployment.parameters })

  async function submit(): Promise<void> {
    loading.value = true

    const values: DeploymentFlowRunCreate = {
      state: {
        type: 'scheduled',
        message: 'Run from the Prefect UI',
      },
      parameters: parameters.value,
      enforceParameterSchema: enforceParameterSchema.value,
    }

    try {
      const flowRun = await api.deployments.createDeploymentFlowRun(props.deployment.id, values)

      const toastMessage = h(ToastFlowRunCreate, { flowRun, flowRunRoute: routes.flowRun, router, immediate: true })
      showToast(toastMessage, 'success')
    } catch (error) {
      const message = getApiErrorMessage(error, localization.error.scheduleFlowRun)
      showToast(message, 'error')
      console.error(error)

      return
    } finally {
      loading.value = false
    }

    showModal.value = false
  }
</script>

<style>
.quick-run-parameters-modal-v2__header { @apply
  flex
  items-center
  justify-between
}
</style>