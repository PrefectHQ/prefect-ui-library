<template>
  <p-form class="worker-pool-queue-create-form" @submit="submit">
    <p-content>
      <p-label label="Name" :message="nameErrorMessage" :state="nameState">
        <p-text-input v-model="name" :state="nameState" />
      </p-label>

      <p-label label="Description (Optional)">
        <p-textarea v-model="description" rows="7" />
      </p-label>

      <p-label label="Status (Optional)">
        <p-toggle v-model="isActive">
          <template #append>
            {{ isActiveLabel }}
          </template>
        </p-toggle>
      </p-label>

      <p-label label="Flow Run Concurrency (Optional)">
        <p-number-input v-model="concurrencyLimit" placeholder="Unlimited" :min="0" />
      </p-label>

      <p-label label="Priority" :message="queuePriorityErrorMessage" :state="queuePriorityState">
        <p-number-input v-model="queuePriority" :min="1" :state="queuePriorityState" />
      </p-label>
    </p-content>
    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <SubmitButton action="Create" :loading="pending" />
    </template>
  </p-form>
</template>

  <script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useValidation, useValidationObserver, ValidationRule } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { SubmitButton } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'

  const props = defineProps<{
    workerPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()
  const { validate, pending } = useValidationObserver()

  const name = ref<string>()
  const description = ref<string>()
  const concurrencyLimit = ref<number>()
  const isActive = ref<boolean>(true)
  const isActiveLabel = computed(() => isActive.value ? 'Active' :
    'Paused')
  const queuePriority = ref<number>()

  const isRequired: ValidationRule<string | undefined> = (value) => value !== undefined && value.trim().length > 0

  const isGreaterThanZero: ValidationRule<number | undefined> = (value, name) => {
    if (value && value > 0) {
      return true
    }

    return `${name} must be greater than 0`
  }


  const { error: nameErrorMessage, state: nameState } = useValidation(name, 'Name', [isRequired])
  const { error: queuePriorityErrorMessage, state: queuePriorityState } = useValidation(queuePriority, 'Priority', [isGreaterThanZero])

  function cancel(): void {
    router.back()
  }

  const submit = async (): Promise<void> => {
    const valid = await validate()
    if (valid) {
      const values = {
        name: name.value,
        description: description.value,
        isPaused: !isActive.value,
        concurrencyLimit: concurrencyLimit.value,
        priority: queuePriority.value,
      }

      try {
        console.log(values)
        const { name } = await api.workerPoolQueues.createWorkerPoolQueue(props.workerPoolName, values)
        showToast(localization.success.createWorkerPoolQueue, 'success')

        router.push(routes.workerPoolQueue(props.workerPoolName, name))
      } catch (error) {
        showToast(localization.error.createWorkerPoolQueue, 'error')
        console.error(error)
      }
    }
  }
</script>

<style>
.worker-pool-queue-create-form {
@apply
  border
  border-gray-300
  px-6
  py-6
  rounded-lg
}
</style>