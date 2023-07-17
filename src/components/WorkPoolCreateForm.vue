<template>
  <p-form class="work-pool-create-form" @submit="submit">
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

      <p-label label="Type" :state="typeState" :message="typeErrorMessage">
        <template #description>
          <p>
            The type of worker to run within this work pool. To learn more about workers, check out
            <p-link :to="localization.docs.workPools">
              the docs
            </p-link>.
          </p>
        </template>
        <WorkPoolTypeSelect v-model:selected="type" />
      </p-label>

      <template v-if="showBaseJobTemplateFormSection">
        <WorkPoolBaseJobTemplateFormSection v-model:base-job-template="baseJobTemplate" />
      </template>
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
  import { useSubscription, useValidation, useValidationObserver, ValidationRule } from '@prefecthq/vue-compositions'
  import { computed, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { SubmitButton, WorkPoolTypeSelect, WorkPoolBaseJobTemplateFormSection } from '@/components'
  import { useCan, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkPoolCreate } from '@/models'
  import { WorkerBaseJobTemplate } from '@/types'

  const api = useWorkspaceApi()
  const can = useCan()
  const router = useRouter()
  const routes = useWorkspaceRoutes()

  const { validate, pending } = useValidationObserver()

  const name = ref<string>()
  const description = ref<string>()
  const type = ref<string>('prefect-agent')
  const concurrencyLimit = ref<number>()

  const workersCollectionSubscription = useSubscription(api.collections.getWorkerCollection, [])
  const workersCollectionItems = computed(() => workersCollectionSubscription.response)

  const remoteBaseJobTemplate = computed(() => {
    return workersCollectionItems.value?.find((item) => item.type === type.value)?.defaultBaseJobConfiguration ?? {}
  })
  const baseJobTemplatesMap = reactive(new Map<string, WorkerBaseJobTemplate>())
  const baseJobTemplate = computed<WorkerBaseJobTemplate>({
    get() {
      if (type.value) {
        return baseJobTemplatesMap.get(type.value) ?? remoteBaseJobTemplate.value
      }
      return {}
    },
    set(value) {
      if (type.value) {
        baseJobTemplatesMap.set(type.value, value)
      }
    },
  })

  const typeIsNotPrefectAgent = computed(() => type.value !== 'prefect-agent')
  const showBaseJobTemplateFormSection = computed(() => type.value && typeIsNotPrefectAgent.value)

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
      const values: WorkPoolCreate = {
        name: name.value,
        description: description.value,
        type: type.value,
        isPaused: false,
        concurrencyLimit: concurrencyLimit.value,
        baseJobTemplate: baseJobTemplate.value,
      }

      try {
        const { name } = await api.workPools.createWorkPool(values)
        showToast(localization.success.createWorkPool, 'success')

        router.push(routes.workPool(name))
      } catch (error) {
        showToast(localization.error.createWorkPool, 'error')
        console.error(error)
      }
    }
  }
</script>

<style>
.work-pool-create-form { @apply
  border
  dark:border-background-600
  px-6
  py-6
  rounded-lg
}
</style>