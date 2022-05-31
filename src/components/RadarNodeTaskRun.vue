<template>
  <RadarNode />
</template>

<script lang="ts" setup>
  import { RadarNode } from '@prefecthq/radar'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import RadarNodeComponent from './RadarNode.vue'
  import StateIcon from './StateIcon.vue'
  import { TaskRun, GraphNode, StateType } from '@/models'
  import { taskRunsApiKey } from '@/services/TaskRunsApi'
  import { secondsToApproximateString } from '@/utilities'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    // this was Radar from @prefecthq/radar but until the exports
    // for that package are fixed we can't import the type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    node?: RadarNode,
    data: GraphNode,
  }>()


  const taskRunsApi = inject(taskRunsApiKey)
  const subscription = useSubscription(taskRunsApi.getTaskRun, [props.data.id])


  const taskRun = computed<TaskRun | undefined>(() => {
    return subscription.response
  })

  const taskRunName = computed(() => taskRun.value?.name)
  const state = computed(() => {
    return taskRun.value?.state ?? props.data.state
  })

  const duration = computed<string>(() => {
    return taskRun.value?.estimatedRunTime
      ? secondsToApproximateString(taskRun.value.estimatedRunTime)
      : '--'
  })

  const classes = computed(() => {
    const stateType = state.value?.type.toLowerCase()
    return {
      nodeClass: [
        `${ stateType }-border`, `${ stateType }-bg`, {
          // 'radar-node--observed': observed.value,
          // 'radar-node--selected': props.selected,
        },
      ],
      iconClass: `pi-${ stateType }`,
    }
  })
</script>

<style>

</style>