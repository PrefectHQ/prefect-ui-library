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

      <p-label label="Flow Run Concurrency (Optional)">
        <template #default="{ id }">
          <p-number-input :id="id" v-model="concurrencyLimit" placeholder="Unlimited" :min="0" />
        </template>
      </p-label>

      <p-label v-if="can.access.workers" label="Type">
        <WorkPoolTypeSelect :selected="type" disabled />
      </p-label>

      <p-label v-if="type && schemaHasProperties && can.access.workers" label="Base Job Configuration">
        <SchemaFormFieldsWithValues v-model:values="parameters" :schema="schema" />
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
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { SubmitButton, WorkPoolTypeSelect, SchemaFormFieldsWithValues } from '@/components'
  import { useCan, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkPool, WorkPoolEdit } from '@/models'
  import { mapper } from '@/services/Mapper'
  import { Schema } from '@/types/schemas'

  const props = defineProps<{
    workPool: WorkPool,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()
  const router = useRouter()
  const routes = useWorkspaceRoutes()
  const { validate, pending } = useValidationObserver()

  const description = ref<string | null | undefined>(props.workPool.description)
  const type = ref<string>(props.workPool.type)
  const concurrencyLimit = ref<number | null | undefined>(props.workPool.concurrencyLimit)
  const schema = computed<Schema>(() => mapper.map('SchemaResponse', props.workPool.baseJobTemplate.variables ?? {}, 'Schema'))
  // Set parameters to the default values from the schema so they are pre-filled in the form
  const parameters = ref<Record<string, unknown>>(
    Object.entries(props.workPool.baseJobTemplate.variables?.properties ?? {}).reduce((acc, [key, value]) => ({ ...acc, [key]: value?.default }), {}),
  )

  const schemaHasProperties = computed(() => {
    const { properties } = schema.value

    return properties && Object.keys(properties).length > 0
  })

  function cancel(): void {
    router.back()
  }

  const submit = async (): Promise<void> => {
    const baseJobTemplateSchema = mapper.map('WorkerSchemaProperty', { values: parameters.value, schema: props.workPool.baseJobTemplate }, 'WorkerSchemaPropertyRequest')

    const valid = await validate()
    if (valid) {
      const values: WorkPoolEdit = {
        description: description.value,
        concurrencyLimit: concurrencyLimit.value,
        baseJobTemplate: baseJobTemplateSchema,
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
  dark:border-background-600
  px-6
  py-6
  rounded-lg
}
</style>