<template>
  <div
    ref="observe"
    class="radar-node-task-run"
    :class="classes.nodeClass"
    @click.stop="selectNode"
    @mouseover="highlightNode"
    @mouseout="highlightNode"
    @focus.self="panToNode"
  >
    <div
      class="radar-node__icon"
    >
      <state-icon :state-type="data.state?.type" />
    </div>

    <div
      class="radar-node__content"
    >
      <!-- v-skeleton="!taskRun?.name" -->
      <div class="text-truncate">
        {{ taskRun?.name }}
      </div>
      <div class="d-flex align-center justify-space-between">
        <div

          class="radar-node__duration text-truncate font--secondary caption"
        >
          {{ duration }}
        </div>
        <a
          v-if="node?.downstreamNodes.size > 0"
          class="radar-node__collapse-link caption-small flex-shrink"
          tabindex="-1"
          @click.stop="toggle"
        >
          {{ collapsed ? 'Show' : 'Hide' }}
        </a>
      </div>
    </div>
    <transition name="scale" mode="out-in">
      <div v-if="collapsed" class="position-absolute radar-node__collapsed-badge caption">
        {{ collapsed.size.toLocaleString() }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import StateIcon from './StateIcon.vue'
  import { TaskRun, GraphNode, StateType } from '@/models'
  import { taskRunsApiKey } from '@/services/TaskRunsApi'
  import { secondsToApproximateString } from '@/utilities'
  import { inject } from '@/utilities/inject'


  const props = defineProps<{
    // this was Radar from @prefecthq/radar but until the exports
    // for that package are fixed we can't import the type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    node?: any,
    data: GraphNode,
    toggle?: () => void,
    highlightNode?: () => void,
    selectNode?: () => void,
    panToNode?: () => void,
    // same for this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collapsed?: Map<string, any>,
    selected?: boolean,
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