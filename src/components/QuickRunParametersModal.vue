<template>
  <p-modal v-model:showModal="internalShowModal" class="quick-run-parameters-modal-v2" title="Run Deployment">
    <SchemaFormV2
      :id="formId"
      v-model:values="parameters"
      :schema="deployment.parameterOpenApiSchema"
      :enforce-parameter-schema
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
  import { Deployment, DeploymentFlowRunCreate } from '@/models'
  import { SchemaFormV2, SchemaValuesV2 } from '@/schemas'
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

  const enforceParameterSchema = ref(props.deployment.enforceParameterSchema)
  const parameters = ref<SchemaValuesV2>({ ...props.deployment.parameters })

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  async function submit(): Promise<void> {
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