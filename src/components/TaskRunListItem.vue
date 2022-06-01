<template>
  <StateListItem v-model:selected="model" v-bind="{ value, disabled, tags, stateType }" class="task-run-list-item">
    <template #name>
      <span>{{ taskRun.name }}</span>
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

  const stateType = computed(() => props.taskRun.state?.type)
  const tags = computed(() => props.taskRun.tags)
  const value = computed(() => props.taskRun.id)
</script>