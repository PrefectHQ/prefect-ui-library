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
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { SchemaValues } from '@/types/schemas'
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
        await api.deployments.createDeployment({
          ...props.deployment,
          name: name.value,
        })
        showToast(localization.success.duplicateDeployment, 'success')
      } catch (error) {
        console.error(error)
        const message = getApiErrorMessage(error, localization.error.duplicateDeployment)
        showToast(message, 'error')
      } finally {
        name.value = ''
        internalShowModal.value = false
      }
    }
  }
</script>