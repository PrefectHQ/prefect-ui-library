<template>
  <div class="flow-run-list-item__relation">
    <span>Work Queue</span> <WorkQueueIconText :work-queue-name="workQueueName" :work-pool-name="workPoolName" />
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'
  import WorkQueueIconText from '@/components/WorkQueueIconText.vue'

  defineProps<{
    workQueueName: string,
    workPoolName?: string | null,
  }>()
</script>
