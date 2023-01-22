<template>
  <p-form class="work-pool-queue-create-form" @submit="submit">
    <p-content>
      <p-label label="Name" :message="nameErrorMessage" :state="nameState">
        <template #default="{ id }">
          <p-text-input :id="id" v-model="name" :state="nameState" />
        </template>
      </p-label>

      <p-label label="Description (Optional)">
        <template #default="{ id }">
          <p-textarea :id="id" v-model="description" rows="7" />
        </template>
      </p-label>

      <p-label label="Flow Run Concurrency (Optional)">
        <template #default="{ id }">
          <p-number-input :id="id" v-model="concurrencyLimit" placeholder="Unlimited" :min="0" />
        </template>
      </p-label>

      <p-label label="Priority (Optional)" :message="queuePriorityErrorMessage" :state="queuePriorityState">
        <template #label>
          <WorkPoolQueuePriorityLabel />
        </template>
        <template #default="{ id }">
          <p-number-input :id="id" v-model="queuePriority" :min="1" :state="queuePriorityState" />
        </template>
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
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { SubmitButton, WorkPoolQueuePriorityLabel } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'

  const props = defineProps<{
    workPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()
  const { validate, pending } = useValidationObserver()

  const name = ref<string>()
  const description = ref<string>()
  const concurrencyLimit = ref<number>()
  const queuePriority = ref<number>()

  const isRequired: ValidationRule<string | undefined> = (value) => value !== undefined && value.trim().length > 0

  const isGreaterThanZeroOrNull: ValidationRule<number | undefined> = (value, name) => {
    if (value == null || value > 0) {
      return true
    }

    return `${name} must be greater than 0`
  }


  const { error: nameErrorMessage, state: nameState } = useValidation(name, 'Name', [isRequired])
  const { error: queuePriorityErrorMessage, state: queuePriorityState } = useValidation(queuePriority, 'Priority', [isGreaterThanZeroOrNull])

  function cancel(): void {
    router.back()
  }

  const submit = async (): Promise<void> => {
    const valid = await validate()
    if (!valid) {
      return
    }

    const values = {
      name: name.value,
      description: description.value,
      isPaused: false,
      concurrencyLimit: concurrencyLimit.value,
      priority: queuePriority.value,
    }

    try {
      const { name } = await api.workPoolQueues.createWorkPoolQueue(props.workPoolName, values)
      showToast(localization.success.createWorkPoolQueue, 'success')

      router.push(routes.workPoolQueue(props.workPoolName, name))
    } catch (error) {
      showToast(localization.error.createWorkPoolQueue, 'error')
      console.error(error)
    }

  }
</script>

<style>
.work-pool-queue-create-form { @apply
  border
  dark:border-background-600
  px-6
  py-6
  rounded-lg
}
</style>