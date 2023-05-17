<template>
  <div class="flow-run-work-queue">
    <span>Work Queue</span>
    <WorkQueueIconText :work-queue-name="workQueueName" :work-pool-name="workPoolName" />
    <WorkQueueStatusIcon :work-queue-name="workQueueName" :work-pool-name="workPoolName" />
  </div>
</template>

<script lang="ts" setup>
  import WorkQueueIconText from '@/components/WorkQueueIconText.vue'
  import WorkQueueStatusIcon from '@/components/WorkQueueStatusIcon.vue'

  defineProps<{
    workQueueName: string,
    workPoolName?: string | null,
  }>()
</script>

<style>
.flow-run-work-queue { @apply
  flex gap-1
}
</style>