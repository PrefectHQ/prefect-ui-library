<template>
  <div class="flow-run-timeline">
    <div v-if="graphData.length > 0" class="flow-run-timeline-container">
      <div class="flow-run-timeline-container__beta-badge">
        <BetaBadge />
      </div>
      <FlowRunTimeline
        class="flow-run-timeline__timeline"
        :graph-data="graphData"
        :is-running="isRunning"
        :format-time-by-seconds="formatTimeNumeric"
        :format-time-by-minutes="formatTimeShortNumeric"
        :format-date="formatDate"
        @click="toggleTaskRunPanel"
      />
    </div>
    <Transition name="flow-run-timeline__slide-fade">
      <TaskRunPanel
        v-if="selectedValue"
        v-model:show-panel="showTaskRunPanel"
        :task-run-id="selectedValue"
        @close="showTaskRunPanel = false"
      />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
  import { FlowRunTimeline, TimelineNodeData } from '@prefecthq/graphs'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { BetaBadge, TaskRunPanel } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRun, isValidTimelineNodeData } from '@/models'
  import { formatTimeNumeric, formatTimeShortNumeric, formatDate } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const showTaskRunPanel = ref(false)
  const selectedValue = ref('')

  const toggleTaskRunPanel = (value: string): void => {
    if (selectedValue.value === '' || !showTaskRunPanel.value) {
      selectedValue.value = value
    }

    if (selectedValue.value === value) {
      showTaskRunPanel.value = !showTaskRunPanel.value
    } else {
      selectedValue.value = value
    }
  }

  const isRunning = computed(() => {
    return props.flowRun.state?.name.toLowerCase() === 'running'
  })

  const api = useWorkspaceApi()

  const graphSubscription = useSubscription(
    api.flowRuns.getFlowRunsTimeline,
    [props.flowRun.id],
    { interval: 5000 },
  )

  const graphData = computed(() => {
    const items: TimelineNodeData[] = (graphSubscription.response ?? [])
      .filter((node): node is TimelineNodeData => isValidTimelineNodeData(node))
      .sort((nodeA, nodeB) => {
        return nodeA.start.getTime() - nodeB.start.getTime()
      })

    return items
  })
</script>

<style>
.flow-run-timeline { @apply
  flex
  overflow-hidden
}

.flow-run-timeline__timeline { @apply
  bg-background-600
  dark:bg-background
}

.flow-run-timeline-container {
  height: 350px;
  width: 100%;
  position: relative;
}
.flow-run-timeline-container__beta-badge { @apply
  absolute
  bottom-1
  left-1
  z-10
}

.flow-run-timeline__slide-fade-enter-active {
  width: 0;
  transition: all .5s ease-out;
}

.flow-run-timeline__slide-fade-leave-active { @apply
  w-96
  transition-all
}

.flow-run-timeline__slide-fade-enter-from,
.flow-run-timeline__slide-fade-leave-to {
  transform: translateX(200px);
  width: 0;
  opacity: 0;
}
</style>
