<template>
  <p-tooltip v-if="limitReached" :text="limitReachedText">
    <p-icon icon="StopCircleIcon" size="small" class="work-pool-concurrency-warning__icon" />
  </p-tooltip>
  <!--
    <div>
    Concurrency Limit Reached
    {{ workPool.concurrencyLimit }}
    Runs taking concurrency:
    <div v-for="run in flowRuns" :key="run.id">
    {{ run.name }}
    </div>
    </div>
  -->
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue'
  import { useFlowRunsFilter, useFlowRuns } from '@/compositions'
  import { WorkPool } from '@/models'


  const props = defineProps<{
    workPool: WorkPool,
  }>()

  const { filter } = useFlowRunsFilter({
    workPools: {
      name: [props.workPool.name],
    },
    flowRuns: {
      state: {
        type: ['Pending', 'Running', 'Cancelling', 'Paused'],
      },
    },
  })

  const { flowRuns } = useFlowRuns(filter)

  const limitReached = computed(() => props.workPool.concurrencyLimit && flowRuns.value.length >= props.workPool.concurrencyLimit)
  const limitReachedText = computed(() => `Concurrency limit reached. ${flowRuns.value.length} runs in progress.`)
</script>

<style>
.work-pool-concurrency-warning__icon {
  @apply
  text-sentiment-warning
}
</style>