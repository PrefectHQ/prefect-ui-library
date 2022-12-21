<template>
  <p-form class="worker-pool-create-form" @submit="submit">
    <p-content>
      <p-label label="Name " :message="nameErrorMessage" :state="nameState">
        <p-text-input v-model="name" :state="nameState" />
      </p-label>

      <p-label label="Description (Optional)">
        <p-textarea v-model="description" rows="7" />
      </p-label>

      <p-label label="Type" :state="typeState" :message="typeErrorMessage">
        <WorkerPoolTypeSelect v-model:selected="type" :state="typeState" />
      </p-label>

      <p-label label="Status (Optional)">
        <p-toggle v-model="isActive">
          <template #append>
            <div>
              <template v-if="isActive">
                Active
              </template>
              <template v-else>
                Paused
              </template>
            </div>
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
      <SubmitButton action="Create" :loading="pending" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useValidation, useValidationObserver, ValidationRule } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { SubmitButton, WorkerPoolTypeSelect } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()

  const { validate, pending } = useValidationObserver()

  const name = ref('')
  const description = ref()
  const type = ref('')
  const concurrencyLimit = ref()
  const isPaused = ref()
  const isActive = computed({
    get() {
      return !isPaused.value
    },
    set() {
      isPaused.value = !isPaused.value
    },
  })

  const isRequired: ValidationRule<string> = (value) => value.trim().length > 0

  const rules: Record<string, ValidationRule<string>[]> = {
    name: [isRequired],
    type: [isRequired],
  }

  const { error: nameErrorMessage, state: nameState } = useValidation(name, 'Name', rules.name)
  const { error: typeErrorMessage, state: typeState } = useValidation(type, 'Type', rules.type)

  function cancel(): void {
    router.push(routes.workerPools())
  }
  const submit = async (): Promise<void> => {
    const valid = await validate()
    if (valid) {
      const values = {
        name: name.value,
        description: description.value,
        type: type.value,
        isPaused: isPaused.value,
        concurrencyLimit: concurrencyLimit.value,
      }

      try {
        const { name } = await api.workerPools.createWorkerPool(values)
        showToast(localization.success.createWorkerPool, 'success')

        router.push(routes.workerPool(name))
      } catch (error) {
        showToast(localization.error.createWorkerPool, 'error')
        console.error(error)
      }
    }
  }
</script>

<style>
.worker-pool-create-form {
@apply
  border-[1px]
  border-gray-300
  px-6
  py-6
  rounded-lg
}
</style>