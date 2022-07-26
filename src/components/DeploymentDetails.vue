<template>
  <div class="deployment-details">
    <p-key-value label="Flow" :alternate="alternate">
      <template #value>
        <FlowIconText :flow-id="deployment.flowId" />
      </template>
    </p-key-value>

    <p-key-value v-if="deployment.storageDocumentId" label="Storage" :alternate="alternate">
      <template #value>
        <StorageIconText :storage-document-id="deployment.storageDocumentId" />
      </template>
    </p-key-value>

    <p-key-value label="Schedule" :alternate="alternate">
      <template #value>
        <ScheduleFieldset v-model="internalSchedule" />
      </template>
    </p-key-value>


    <p-key-value label="Created" :value="formatDateTimeNumeric(deployment.created)" :alternate="alternate" />

    <p-key-value label="Last Updated" :value="formatDateTimeNumeric(deployment.updated)" :alternate="alternate" />

    <p-divider />

    <p-key-value label="Deployment ID" :value="deployment.id" :alternate="alternate" />

    <p-key-value label="Flow ID" :value="deployment.flowId" :alternate="alternate" />

    <p-key-value label="Storage Document ID" :value="deployment.storageDocumentId" :alternate="alternate" />

    <p-key-value
      label="Infrastructure Document ID"
      :value="deployment.infrastructureDocumentId"
      :alternate="alternate"
    />

    <p-key-value label="Tags" :alternate="alternate">
      <template #value>
        <template v-if="deployment.tags?.length">
          <p-tags :tags="deployment.tags" class="deployment-details__tags" />
        </template>
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { ref, computed } from 'vue'
  import ScheduleFieldset from './ScheduleFieldset.vue'
  import FlowIconText from '@/components/FlowIconText.vue'
  import StorageIconText from '@/components/StorageIconText.vue'
  import { Schedule } from '@/models'
  import { Deployment } from '@/models/Deployment'

  const props = defineProps<{
    deployment: Deployment,
    alternate?: boolean,
  }>()

  const _deployment = ref(props.deployment)

  const internalSchedule = computed({
    get() {
      return _deployment.value.schedule
    },
    set(val: Schedule | null) {
      updateSchedule(val)
    },
  })

  const updateSchedule = (schedule: Schedule | null): void => {
    // do nothing
    _deployment.value.schedule = schedule
  }
</script>

<style>
.deployment-details { @apply
  flex
  flex-col
  gap-3
  items-start
}

.deployment-details__tags { @apply
  mt-1
}
</style>