<template>
  <p-form class="worker-pool-edit-form" @submit="submit">
    <p-content>
      <p-label label="Name">
        <p-text-input :model-value="workerPool.name" disabled />
      </p-label>

      <p-label label="Description (Optional)">
        <p-textarea v-model="description" rows="7" />
      </p-label>

      <p-label label="Type">
        <p-select :model-value="typeLabel" :options="[typeLabel]" disabled />
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
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { SubmitButton } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkerPool } from '@/models'
  import { mapProcessTypeValueToProcessTypeLabel } from '@/utilities'

  const props = defineProps<{
    workerPool: WorkerPool,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()
  const { validate, pending } = useValidationObserver()

  const description = ref<string | null | undefined>(props.workerPool.description)
  const type = ref<string | null | undefined>(props.workerPool.type)
  const typeLabel = computed(() => mapProcessTypeValueToProcessTypeLabel(type.value))
  const concurrencyLimit = ref<number | null | undefined>(props.workerPool.concurrencyLimit)
  const isActive = ref<boolean | undefined>(!props.workerPool.isPaused)
  const isActiveLabel = computed(() => isActive.value ? 'Active' : 'Paused')

  function cancel(): void {
    router.back()
  }

  const submit = async (): Promise<void> => {
    const valid = await validate()
    if (valid) {
      const values = {
        description: description.value,
        isPaused: !isActive.value,
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