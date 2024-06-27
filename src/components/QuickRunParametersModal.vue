<template>
  <p-modal v-model:showModal="internalShowModal" class="quick-run-parameters-modal-v2" title="Run Deployment">
    <SchemaFormV2
      :id="formId"
      v-model:values="parameters"
      :schema="deployment.parameterOpenApiSchema"
      :validate
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
        <template v-if="disableValidationCheckbox">
          <p-tooltip>
            <template #content>
              <p>Parameters are always validated for deployments with parameter enforcement enabled.</p>
              <p>You can disable this setting on <span><p-link :to="routes.deploymentEdit(deployment.id)">the deployment</p-link></span></p>
            </template>
            <div class="w-fit">
              <p-checkbox v-model="validate" disabled label="Validate parameters before submitting" />
            </div>
          </p-tooltip>
        </template>
        <template v-else>
          <p-checkbox v-model="validate" label="Validate parameters before submitting" />
        </template>
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
  import { Deployment, DeploymentFlowRunCreateV2 } from '@/models'
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

  const disableValidationCheckbox = props.deployment.enforceParameterSchema
  const validate = ref(true)
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