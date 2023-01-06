<template>
  <p-form class="worker-pool-edit-form" @submit="submit">
    <p-content>
      <p-label label="Name">
        <template #default="{ id }">
          <p-text-input :id="id" :model-value="workerPool.name" disabled />
        </template>
      </p-label>

      <p-label label="Description (Optional)">
        <template #default="{ id }">
          <p-textarea :id="id" v-model="description" rows="7" />
        </template>
      </p-label>

      <p-label label="Type">
        <template #default="{ id }">
          <p-select :id="id" :model-value="workerPool.typeLabel" :options="[workerPool.typeLabel]" disabled />
        </template>
      </p-label>

      <p-label label="Flow Run Concurrency (Optional)">
        <template #default="{ id }">
          <p-number-input :id="id" v-model="concurrencyLimit" placeholder="Unlimited" :min="0" />
        </template>
      </p-label>
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <SubmitButton action="Save" :loading="pending" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useValidationObserver } from '@prefecthq/vue-compositions'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { SubmitButton } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkerPool } from '@/models'

  const props = defineProps<{
    workerPool: WorkerPool,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()
  const { validate, pending } = useValidationObserver()

  const description = ref<string | null | undefined>(props.workerPool.description)
  const concurrencyLimit = ref<number | null | undefined>(props.workerPool.concurrencyLimit)

  function cancel(): void {
    router.back()
  }

  const submit = async (): Promise<void> => {
    const valid = await validate()
    if (valid) {
      const values = {
        description: description.value,
        concurrencyLimit: concurrencyLimit.value,
      }
      try {
        await api.workerPools.updateWorkerPool(props.workerPool.name, values)
        showToast(localization.success.updateWorkerPool, 'success')
        router.push(routes.workerPool(props.workerPool.name))
      } catch (error) {
        showToast(localization.error.updateWorkerPool, 'error')
        console.error(error)
      }
    }
  }
</script>

<style>
.worker-pool-edit-form { @apply
  border
  border-gray-300
  px-6
  py-6
  rounded-lg
}
</style>