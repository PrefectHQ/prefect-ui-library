<template>
  <div class="work-queue-details">
    <template v-if="workQueueStatus">
      <p-key-value label="Status" :alternate="alternate">
        <template #value>
          <WorkQueueStatusBadge :work-queue="workQueue" />
        </template>
      </p-key-value>
    </template>

    <p-key-value label="Description" :value="workQueue.description" :alternate="alternate" />

    <p-divider />

    <p-key-value label="Work Queue ID" :value="workQueue.id" :alternate="alternate" />

    <p-key-value label="Flow Run Concurrency" :value="workQueue.concurrencyLimit" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(workQueue.created)" :alternate="alternate" />

    <template v-if="workQueueStatus">
      <p-key-value label="Last Polled" :value="workQueueStatus.lastPolled ? formatDateTimeNumeric(workQueueStatus.lastPolled) : null" :alternate="alternate" />
    </template>

    <template v-if="workQueue.filter">
      <p-key-value :label="deploymentLabel" :alternate="alternate">
        <template v-if="workQueue.filter.deploymentIds.length" #value>
          <div class="work-queue-details__deployments">
            <template v-for="deploymentId in deploymentIds" :key="deploymentId">
              <DeploymentIconText :deployment-id="deploymentId" />
            </template>
          </div>
        </template>
        <template #empty>
          Any
        </template>
      </p-key-value>

      <p-key-value label="Tags" :alternate="alternate">
        <template v-if="workQueue.filter.tags.length" #value>
          <p-tags :tags="workQueue.filter.tags" class="mt-2" />
        </template>
      </p-key-value>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { WorkQueueStatusBadge } from '@/components'
  import DeploymentIconText from '@/components/DeploymentIconText.vue'
  import { useWorkQueueStatus } from '@/compositions'
  import { WorkQueue } from '@/models/WorkQueue'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    workQueue: WorkQueue,
    alternate?: boolean,
  }>()

  const deploymentIds = computed(() => {
    return props.workQueue.filter?.deploymentIds
  })

  const deploymentLabel = computed(() => {
    const num = deploymentIds.value?.length ?? 0
    return num > 0 ? `${num} Deployments` : 'Deployments'
  })

  const { workQueueStatus } = useWorkQueueStatus(props.workQueue.id)
</script>

<style>
.work-queue-details { @apply
  flex
  flex-col
  gap-3
  items-start
}

.work-queue-details__tags { @apply
  mt-1
}

.work-queue-details__deployments { @apply
  flex
  flex-col
  gap-2
}
</style>