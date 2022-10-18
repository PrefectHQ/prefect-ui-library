<template>
  <StateListItem v-model:selected="model" v-bind="{ value, disabled, tags, stateType }" class="task-run-list-item">
    <template #name>
      <p-link :to="taskRunRoute(taskRun.id)">
        <span>{{ taskRun.name }}</span>
      </p-link>
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
  import { CheckboxModel, secondsToApproximateString, formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import StateBadge from '@/components/StateBadge.vue'
  import StateListItem from '@/components/StateListItem.vue'
  import { TaskRun } from '@/models/TaskRun'
  import { taskRunRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    selected: CheckboxModel | null,
    taskRun: TaskRun,
    disabled?: boolean,
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
  const taskRunRoute = inject(taskRunRouteKey)

  const stateType = computed(() => props.taskRun.state?.type)
  const tags = computed(() => props.taskRun.tags)
  const value = computed(() => props.taskRun.id)
</script>