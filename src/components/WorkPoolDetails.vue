<template>
  <div class="work-pool-details">
    <template v-if="workPool.status">
      <p-key-value label="Status" :alternate="alternate">
        <template #value>
          <WorkPoolStatusBadge :work-pool="workPool" />
        </template>
      </p-key-value>
    </template>

    <p-key-value label="Description" :value="workPool.description" :alternate="alternate" />

    <p-key-value label="Type" :value="workPool.typeLabel" :alternate="alternate" />

    <p-key-value label="Concurrency Limit" :value="workPool.concurrencyLimit" :alternate="alternate" />

    <p-key-value label="Created" :alternate="alternate">
      <template #value>
        <FormattedDate :date="workPool.created" format="numeric" />
      </template>
    </p-key-value>

    <p-key-value label="Last Updated" :alternate="alternate">
      <template #value>
        <FormattedDate :date="workPool.updated" format="numeric" />
      </template>
    </p-key-value>

    <p-key-value v-if="workPoolWorkers.length" label="Last Polled" :alternate="alternate">
      <template #value>
        <FormattedDate :date="lastWorkerHeartbeat" format="numeric" />
      </template>
    </p-key-value>

    <template v-if="showBaseJobTemplateDetails">
      <p-divider />
      <h3>
        Base Job Configuration
      </h3>
      <SchemaPropertiesKeyValues :values="baseJobTemplateVariablesDefaults" v-bind="{ schema, alternate }" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { SchemaPropertiesKeyValues, WorkPoolStatusBadge } from '@/components'
  import FormattedDate from '@/components/FormattedDate.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkPool } from '@/models'
  import { getSchemaDefaultValues, mapper } from '@/services'

  const props = defineProps<{
    workPool: WorkPool,
    alternate?: boolean,
  }>()

  const api = useWorkspaceApi()
  const subscriptionOptions = {
    interval: 30000,
  }

  const workPoolWorkersSubscription = useSubscription(api.workPoolWorkers.getWorkers, [props.workPool.name, {}], subscriptionOptions)
  const workPoolWorkers = computed(() => workPoolWorkersSubscription.response ?? [])
  const lastWorkerHeartbeat = computed(() => workPoolWorkers.value[0].lastHeartbeatTime)
  const schemaHasProperties = computed(() => {
    const { properties } = props.workPool.baseJobTemplate.variables ?? {}

    return properties && Object.keys(properties).length > 0
  })
  const schema = computed(() => mapper.map('SchemaResponse', props.workPool.baseJobTemplate.variables ?? {}, 'Schema'))
  const showBaseJobTemplateDetails = computed(() => props.workPool.type && schemaHasProperties.value)
  const baseJobTemplateVariablesDefaults = computed(() => getSchemaDefaultValues(schema.value))
</script>

<style>
.work-pool-details { @apply
  flex
  flex-col
  gap-3
  items-start
}
</style>