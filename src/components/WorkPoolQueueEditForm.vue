<template>
  <p-form class="work-pool-queue-edit-form p-background" @submit="submit">
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

      <p-label label="Priority" :message="queuePriorityErrorMessage" :state="queuePriorityState">
        <template #label>
          <WorkPoolQueuePriorityLabel />
        </template>

        <template #default="{ id }">
          <p-number-input :id="id" v-model="queuePriority" :min="1" :state="queuePriorityState" />
        </template>
      </p-label>
    </p-content>

    <template #footer>
      <p-button @click="cancel">
        Cancel
      </p-button>
      <SubmitButton action="Save" :loading="pending" />
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
  import { WorkPoolQueue } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueue: WorkPoolQueue,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()
  const { validate, pending } = useValidationObserver()

  const name = ref<string>(props.workPoolQueue.name)
  const description = ref<string | null | undefined>(props.workPoolQueue.description)
  const concurrencyLimit = ref<number | null | undefined>(props.workPoolQueue.concurrencyLimit)
  const queuePriority = ref<number>(props.workPoolQueue.priority)

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
        concurrencyLimit: concurrencyLimit.value,
        priority: queuePriority.value,
      }
      try {
        await api.workPoolQueues.updateWorkPoolQueue(props.workPoolName, props.workPoolQueue.name, values)

        showToast(localization.success.updateWorkPoolQueue, 'success')
        router.push(routes.workPoolQueue(props.workPoolName, values.name))
      } catch (error) {
        const message = getApiErrorMessage(error, localization.error.updateWorkPool)
        showToast(message, 'error')
        console.error(error)
      }
    }
  }
  </script>


<style>
.work-pool-queue-edit-form { @apply
  px-6
  py-6
  rounded-default
}
</style>