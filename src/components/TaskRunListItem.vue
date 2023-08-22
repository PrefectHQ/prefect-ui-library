<template>
  <StateListItem v-model:selected="model" v-bind="{ selectable, value, tags, stateType }" class="task-run-list-item">
    <template #name>
      <div class="task-run-list-item__breadcrumbs">
        <template v-if="taskRun.flowRunId && !isFlowRunRoute && flowRun">
          <p-link :to="routes.flowRun(taskRun.flowRunId)">
            {{ flowRun.name }}
          </p-link>
          <p-icon icon="ChevronRightIcon" size="small" />
        </template>

        <p-link :to="routes.taskRun(taskRun.id)">
          <span>{{ taskRun.name }}</span>
        </p-link>
      </div>
    </template>
    <template #meta>
      <StateBadge :state="taskRun.state" />
      <p-icon-text icon="ClockIcon">
        {{ secondsToApproximateString(taskRun.duration) }}
      </p-icon-text>
      <p-icon-text class="flow-run-date-icon-text" icon="CalendarIcon">
        <template v-if="taskRun.startTime">
          {{ formatDateTimeNumeric(taskRun.startTime) }}
        </template>
        <template v-else-if="taskRun.expectedStartTime">
          {{ formatDateTimeNumeric(taskRun.expectedStartTime) }}
        </template>
      </p-icon-text>
    </template>
  </StateListItem>
</template>

<script lang="ts" setup>
  import { CheckboxModel } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import StateBadge from '@/components/StateBadge.vue'
  import StateListItem from '@/components/StateListItem.vue'
  import { useFlowRun, useWorkspaceRoutes } from '@/compositions'
  import { TaskRun } from '@/models/TaskRun'
  import { formatDateTimeNumeric } from '@/utilities/dates'
  import { secondsToApproximateString } from '@/utilities/seconds'

  const props = defineProps<{
    selectable?: boolean,
    selected?: CheckboxModel | null,
    taskRun: TaskRun,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: CheckboxModel): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? undefined
    },
    set(value: CheckboxModel) {
      emit('update:selected', value)
    },
  })

  const route = useRoute()
  const routes = useWorkspaceRoutes()
  const stateType = computed(() => props.taskRun.state?.type)
  const tags = computed(() => props.taskRun.tags)
  const value = computed(() => props.taskRun.id)

  const { flowRun } = useFlowRun(props.taskRun.flowRunId)
  const isFlowRunRoute = computed(() => route.name === routes.flowRun('').name)
</script>

<style>
.task-run-list-item__breadcrumbs { @apply
  flex
  items-center
  gap-1
}
</style>