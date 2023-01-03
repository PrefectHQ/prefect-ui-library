<template>
  <p-form class="worker-pool-create-form" @submit="submit">
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

      <p-label label="Type" :state="typeState" :message="typeErrorMessage">
        <template #default="{ id }">
          <p-select :id="id" model-value="Prefect Agent" :options="['Prefect Agent']" disabled />
        </template>
        <!-- Types feature is not implemented by backend yet -->
        <!-- <WorkerPoolTypeSelect v-model:selected="type" :state="typeState" /> -->
      </p-label>

      <p-label label="Status (Optional)">
        <p-toggle v-model="isActive">
          <template #append>
            {{ isActiveLabel }}
          </template>
        </p-toggle>
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

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()

  const { validate, pending } = useValidationObserver()

  const name = ref<string>()
  const description = ref<string>()
  // Once types feature is implemented by backend, this should be changed to
  // const type = ref<string>()
  const type = ref<string>('prefect-agent')
  const concurrencyLimit = ref<number>()
  const isActive = ref<boolean>(true)
  const isActiveLabel = computed(() => isActive.value ? 'Active' : 'Paused')

  const isRequired: ValidationRule<string | undefined> = (value) => value !== undefined && value.trim().length > 0

  const rules: Record<string, ValidationRule<string | undefined>[]> = {
    name: [isRequired],
    type: [isRequired],
  }

  const { error: nameErrorMessage, state: nameState } = useValidation(name, 'Name', rules.name)
  const { error: typeErrorMessage, state: typeState } = useValidation(type, 'Type', rules.type)

  function cancel(): void {
    router.back()
  }

  const submit = async (): Promise<void> => {
    const valid = await validate()
    if (valid) {
      const values = {
        name: name.value,
        description: description.value,
        type: type.value,
        isPaused: !isActive.value,
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
  border
  border-gray-300
  px-6
  py-6
  rounded-lg
}
</style>