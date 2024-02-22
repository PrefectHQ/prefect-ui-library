<template>
  <p-modal v-model:showModal="internalShowModal" class="parameters-modal" title="Run Deployment">
    <SchemaFormV2 :id="formId" v-model:values="parameters" :schema="deployment.parameterOpenApiSchemaV2" :kinds="['json']" @submit="submit" />

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

  const parameters = ref<SchemaValuesV2>({ ...props.deployment.parametersV2 })


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
