<template>
  <div class="flow-run-work-pool">
    <span>Work Pool</span> <WorkPoolIconText :work-pool-name="workPoolName" />
    <template v-if="!hideWorkPoolStatus && workPool">
      <WorkPoolStatusIcon v-if="workPool" :work-pool="workPool" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { WorkPoolIconText, WorkPoolStatusIcon } from '@/components'
  import { useWorkPool } from '@/compositions'
  import { isTerminalStateType } from '@/models'

  const props = defineProps<{
    workPoolName: string,
    flowRunState?: string | null,
  }>()

  const { workPool } = useWorkPool(props.workPoolName)
  const hideWorkPoolStatus = computed(() => props.flowRunState && isTerminalStateType(props.flowRunState))
</script>

<style>
.flow-run-work-pool { @apply
  flex gap-1
  items-center
}
</style>