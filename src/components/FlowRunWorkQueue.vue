<template>
  <div v-if="!isPushWorkPool" class="flow-run-work-queue">
    <span>Work Queue</span>
    <WorkQueueIconText :work-queue-name="workQueueName" :work-pool-name="workPoolName" />
    <WorkPoolQueueStatusIcon v-if="isNotTerminal && workPoolName" :work-queue-name="workQueueName" :work-pool-name="workPoolName" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { WorkPoolQueueStatusIcon, WorkQueueIconText } from '@/components'
  import { useWorkPool } from '@/compositions'
  import { isTerminalStateType } from '@/models'

  const props = defineProps<{
    workQueueName: string,
    workPoolName?: string | null,
    flowRunState?: string | null,
  }>()

  const isNotTerminal = computed(() => props.flowRunState && !isTerminalStateType(props.flowRunState))
  const { workPool } = useWorkPool(props.workPoolName ?? '')
  const isPushWorkPool = computed(() => workPool.value?.isPushPool)
</script>

<style>
.flow-run-work-queue { @apply
  flex gap-1
}
</style>