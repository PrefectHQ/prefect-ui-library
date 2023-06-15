<template>
  <p-modal v-model:showModal="internalShowModal" class="parameters-modal" title="Run Deployment">
    <p-form @submit="submit">
      <p-content>
        <SchemaInput v-model="parameters" :schema="deployment.parameterOpenApiSchema" />
      </p-content>
    </p-form>

    <template #actions>
      <slot name="actions">
        <p-button :disabled="!valid" @click="submit">
          Run
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { PButton, showToast } from '@prefecthq/prefect-design'
  import { useValidationObserver } from '@prefecthq/vue-compositions'
  import { useField } from 'vee-validate'
  import { computed, h } from 'vue'
  import { useRouter } from 'vue-router'
  import { ToastFlowRunCreate, SchemaInput } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { useForm } from '@/compositions/useForm'
  import { localization } from '@/localization'
  import { Deployment, DeploymentFlowRunCreate } from '@/models'
  import { SchemaValues } from '@/types/schemas'

  const props = defineProps<{
    showModal: boolean,
    deployment: Deployment,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const { handleSubmit } = useForm<DeploymentFlowRunCreate>({
    initialValues: {
      parameters: props.deployment.rawParameters,
      schema: props.deployment.parameterOpenApiSchema,
    },
  })

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  const { validate, valid } = useValidationObserver()

  const submit = handleSubmit(async (values): Promise<void> => {
    const valid = await validate()

    if (!valid) {
      return
    }

    const resolvedValues: DeploymentFlowRunCreate = {
      state: {
        type: 'scheduled',
        message: 'Run from the Prefect UI',
      },
      ...values,
    }
    await createDeploymentFlowRun(props.deployment.id, resolvedValues)
    internalShowModal.value = false
  })

  const { value: parameters } = useField<SchemaValues>('parameters')

  async function createDeploymentFlowRun(deploymentId: string, value: DeploymentFlowRunCreate): Promise<void> {
    try {
      const flowRun = await api.deployments.createDeploymentFlowRun(deploymentId, value)

      const toastMessage = h(ToastFlowRunCreate, { flowRun, flowRunRoute: routes.flowRun, router, immediate: true })
      showToast(toastMessage, 'success')
    } catch (error) {
      showToast(localization.error.scheduleFlowRun, 'error')
      console.error(error)
    }
  }
</script>
