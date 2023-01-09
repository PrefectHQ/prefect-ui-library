<template>
  <p-form class="work-pool-edit-form" @submit="submit">
    <p-content>
      <p-label label="Name">
        <template #default="{ id }">
          <p-text-input :id="id" :model-value="workPool.name" disabled />
        </template>
      </p-label>

      <p-label label="Description (Optional)">
        <template #default="{ id }">
          <p-textarea :id="id" v-model="description" rows="7" />
        </template>
      </p-label>

      <p-label label="Type">
        <template #default="{ id }">
          <p-select :id="id" :model-value="workPool.typeLabel" :options="[workPool.typeLabel]" disabled />
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
  import { WorkPool } from '@/models'

  const props = defineProps<{
    workPool: WorkPool,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()
  const { validate, pending } = useValidationObserver()

  const description = ref<string | null | undefined>(props.workPool.description)
  const concurrencyLimit = ref<number | null | undefined>(props.workPool.concurrencyLimit)

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
        await api.workPools.updateWorkPool(props.workPool.name, values)
        showToast(localization.success.updateWorkPool, 'success')
        router.push(routes.workPool(props.workPool.name))
      } catch (error) {
        showToast(localization.error.updateWorkPool, 'error')
        console.error(error)
      }
    }
  }
</script>

<style>
.work-pool-edit-form { @apply
  border
  border-gray-300
  px-6
  py-6
  rounded-lg
}
</style>