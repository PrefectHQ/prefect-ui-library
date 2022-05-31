<template>
  <ORadarNode class="radar-node-task-run">
    <template #aside>
      <div class="radar-node-task-run__aside" :class="classes.asideClass">
        <StateIcon :state-type="stateType" />
      </div>
    </template>

    <div class="radar-node-task-run__content">
      {{ taskRunName }}
    </div>

    <template #footer-leading>
      <DurationIconText :duration="duration" />
    </template>

    <template #collapsed-badge="{ collapsed }">
      <div class="radar-node-task-run__collapsed-badge">
        {{ collapsed?.size.toLocaleString() }}
      </div>
    </template>
  </ORadarNode>
</template>

<script lang="ts" setup>
  import { RadarNode } from '@prefecthq/radar'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import DurationIconText from './DurationIconText.vue'
  import ORadarNode from './RadarNode.vue'
  import StateIcon from './StateIcon.vue'
  import { TaskRun, GraphNode, StateType } from '@/models'
  import { taskRunsApiKey } from '@/services/TaskRunsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    // this was Radar from @prefecthq/radar but until the exports
    // for that package are fixed we can't import the type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    node?: RadarNode,
    graphNode: GraphNode,
  }>()


  const taskRunsApi = inject(taskRunsApiKey)
  const subscription = useSubscription(taskRunsApi.getTaskRun, [props.graphNode.id])


  const taskRun = computed<TaskRun | undefined>(() => {
    return subscription.response
  })

  const taskRunName = computed(() => taskRun.value?.name)

  const state = computed(() => {
    return taskRun.value?.state ?? props.graphNode.state
  })

  const stateType = computed<StateType | undefined>(() => {
    return state.value?.type
  })

  const duration = computed<number>(() => {
    return taskRun.value?.estimatedRunTime ?? 0
  })

  const classes = computed(() => {
    return {
      asideClass: [`state--${stateType.value}`, {}],
    }
  })
</script>

<style>
.radar-node-task-run {
  @apply
  max-w-md
}

.radar-node-task-run__content {
  @apply
  overflow-hidden
  overflow-ellipsis
  whitespace-nowrap
  max-w-[75%]
}

.radar-node-task-run__aside {
  @apply
  flex
  items-center
  h-full
  px-2
  rounded-tl
  rounded-bl
}

.radar-node-task-run__collapsed-badge {
  @apply
  text-xs
  text-white
  bg-slate-600
  p-1
  rounded-full
  min-w-[24px]
  min-h-[24px]
  text-center
  shadow
}
</style>