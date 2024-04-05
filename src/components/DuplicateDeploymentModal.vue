<template>
  <p-modal v-model:showModal="internalShowModal" class="duplicate-deployment-modal" title="Duplicate Deployment">
    <p-form @submit="submit">
      <p-content>
        <p-label label="Name" :message="nameErrorMessage" :state="nameState">
          <p-text-input v-model="name" :state="nameState" />
        </p-label>
      </p-content>
    </p-form>

    <template #actions>
      <slot name="actions">
        <p-button primary :loading="pending" @click="submit">
          Duplicate
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useValidation, useValidationObserver } from '@prefecthq/vue-compositions'
  import { de } from 'date-fns/locale'
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { DeploymentCreate } from '@/models/DeploymentCreate'
  import { getApiErrorMessage } from '@/utilities/errors'
  import { isRequired } from '@/utilities/formValidation'

  const props = defineProps<{
    showModal: boolean,
    deployment: Deployment,
  }>()

  const name = ref('')
  const { state: nameState, error: nameErrorMessage } = useValidation(name, 'Name', [isRequired])

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })


  const { valid, pending, validate } = useValidationObserver()
  const submit = async (): Promise<void> => {
    await validate()
    if (valid.value) {
      try {
        const deployment: DeploymentCreate = {
          name: name.value,
          description: props.deployment.description,
          flowId: props.deployment.flowId,
          parameters: props.deployment.parameters,
          tags: props.deployment.tags,
          storageDocumentId: props.deployment.storageDocumentId,
          infrastructureDocumentId: props.deployment.infrastructureDocumentId,
          workQueueName: props.deployment.workQueueName,
          workPoolName: props.deployment.workPoolName,
          infrastructureOverrides: props.deployment.infrastructureOverrides,
          enforceParameterSchema: props.deployment.enforceParameterSchema,
          manifestPath: props.deployment.manifestPath,
          path: props.deployment.path,
          entrypoint: props.deployment.entrypoint,
          parameterOpenApiSchema: props.deployment.parameterOpenApiSchema,
          pullSteps: props.deployment.pullSteps,
          isScheduleActive: false,
        }
        const newDeployment = await api.deployments.createDeployment(deployment)
        showToast(localization.success.duplicateDeployment, 'success')
        name.value = ''
        internalShowModal.value = false
        router.push(routes.deployment(newDeployment.id))
      } catch (error) {
        console.error(error)
        const message = getApiErrorMessage(error, localization.error.duplicateDeployment)
        showToast(message, 'error')
      }
    }
  }
</script>