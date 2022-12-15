<template>
  <ORadarNode class="radar-node-task-run">
    <template #aside>
      <div class="radar-node-task-run__aside" :class="classes.asideClass" :title="stateName">
        <StateIcon :state-type="stateType" />
      </div>
    </template>

    <p-link v-if="taskRun" :to="routes.taskRun(taskRun.id)" class="radar-node-task-run__content">
      {{ taskRunName }}
    </p-link>

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
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import DurationIconText from '@/components/DurationIconText.vue'
  import ORadarNode from '@/components/RadarNode.vue'
  import StateIcon from '@/components/StateIcon.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { TaskRun, GraphNode, StateType } from '@/models'

  const props = defineProps<{
    graphNode: GraphNode,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const subscription = useSubscription(api.taskRuns.getTaskRun, [props.graphNode.id], { interval: 5000 })
  const taskRun = computed<TaskRun | undefined>(() => subscription.response)

  const taskRunName = computed(() => taskRun.value?.name)

  const state = computed(() => taskRun.value?.state ?? props.graphNode.state)

  const stateType = computed<StateType | undefined>(() => state.value?.type)

  const stateName = computed<string | undefined>(() => state.value?.name)

  const duration = computed<number>(() => taskRun.value?.duration ?? 0)

  const classes = computed(() => ({
    asideClass: [`state--${stateType.value}`, {}],
  }))
</script>

<style>
.radar-node-task-run { @apply
  w-[18rem]
  box-border
}

.radar-node-task-run__content { @apply
  overflow-hidden
  overflow-ellipsis
  whitespace-nowrap
  max-w-[90%]
}

.radar-node-task-run__aside { @apply
  flex
  items-center
  h-full
  px-2
  rounded-tl
  rounded-bl
}

.radar-node-task-run__collapsed-badge { @apply
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