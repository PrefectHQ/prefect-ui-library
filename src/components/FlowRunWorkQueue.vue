<template>
  <div v-if="!workPool?.isPushPool" class="flow-run-work-queue">
    <span>Work Queue</span>
    <WorkQueueIconText :work-queue-name="workQueueName" :work-pool-name="workPoolName" />
    <WorkPoolQueueStatusIcon v-if="isNotTerminal && workPoolName" :work-queue-name="workQueueName" :work-pool-name="workPoolName" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, toRefs } from 'vue'
  import { WorkPoolQueueStatusIcon, WorkQueueIconText } from '@/components'
  import { useWorkPool } from '@/compositions'
  import { isTerminalStateType } from '@/models'

  const props = defineProps<{
    workQueueName: string,
    workPoolName?: string | null,
    flowRunState?: string | null,
  }>()

  const isNotTerminal = computed(() => props.flowRunState && !isTerminalStateType(props.flowRunState))
  const { workPoolName } = toRefs(props)
  const { workPool } = useWorkPool(workPoolName)
</script>

<style>
.flow-run-work-queue { @apply
  flex gap-1
}
</style>