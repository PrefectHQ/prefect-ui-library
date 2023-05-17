<template>
  <div class="flow-run-work-queue">
    <span>Work Queue</span>
    <WorkQueueIconText :work-queue-name="workQueueName" :work-pool-name="workPoolName" />
    <WorkPoolQueueStatusIcon v-if="isNotTerminal && workPoolName" :work-queue-name="workQueueName" :work-pool-name="workPoolName" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import WorkPoolQueueStatusIcon from '@/components/WorkPoolQueueStatusIcon.vue'
  import WorkQueueIconText from '@/components/WorkQueueIconText.vue'
  import { isTerminalStateType } from '@/models'

  const props = defineProps<{
    workQueueName: string,
    workPoolName?: string | null,
    flowRunState?: string | null,
  }>()

  const isNotTerminal = computed(() => props.flowRunState && !isTerminalStateType(props.flowRunState))
</script>

<style>
.flow-run-work-queue { @apply
  flex gap-1
}
</style>