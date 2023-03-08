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

      <p-label v-if="can.access.workers" label="Type" :state="typeState" :message="typeErrorMessage">
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

      <template v-if="showSchemaForm">
        <h3>Base Job Configuration <BetaBadge /></h3>
        <SchemaFormFieldsWithValues v-model:values="parameters" :schema="schema" />
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
  import { SubmitButton, WorkPoolTypeSelect, SchemaFormFieldsWithValues, BetaBadge } from '@/components'
  import { useCan, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkPoolCreate } from '@/models'
  import { mapper } from '@/services'
  import { Schema, SchemaValues } from '@/types'
  import { getSchemaDefaults, getSchemaWithoutDefaults } from '@/utilities/parameters'

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
  const baseJobConfigs = computed(() => {
    return workersCollectionItems.value?.find((item) => item.type === type.value)?.defaultBaseJobConfiguration ?? {}
  })

  const schema = computed<Schema>(() => mapper.map('SchemaResponse', getSchemaWithoutDefaults(baseJobConfigs.value.variables ?? {}), 'Schema'))
  const schemaDefaultValues = computed(() => getSchemaDefaults(baseJobConfigs.value.variables ?? {}))
  const parametersMap = reactive(new Map<string, SchemaValues>())
  const parameters = computed({
    get() {
      if (type.value) {
        return parametersMap.get(type.value) ?? schemaDefaultValues.value
      }
      return {}
    },
    set(parameters) {
      if (type.value) {
        parametersMap.set(type.value, parameters)
      }
    },
  })

  const schemaHasProperties = computed(() => {
    const { properties } = schema.value

    return properties && Object.keys(properties).length > 0
  })
  const showSchemaForm = computed(() => type.value && schemaHasProperties.value && can.access.workers)

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
        baseJobTemplate: baseJobConfigs.value,
        defaultVariableValues: parameters.value,
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