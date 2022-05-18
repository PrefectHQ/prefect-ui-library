<template>
  <StateListItemInput v-model:selected="model" v-bind="{ value, disabled, tags, stateType }" class="task-run-list-item-input">
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
  </StateListItemInput>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import StateListItemInput from './StateListItemInput.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { TaskRun } from '@/models/TaskRun'
  import { formatDateTimeNumeric } from '@/utilities/dates'
  import { secondsToApproximateString } from '@/utilities/seconds'

  type Selected = boolean | unknown[] | undefined

  const props = defineProps<{
    selected: Selected | null,
    value: unknown,
    taskRun: TaskRun,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: Selected): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? undefined
    },
    set(value: Selected) {
      emit('update:selected', value)
    },
  })

  const stateType = computed(() => props.taskRun.state?.type)
  const tags = computed(() => props.taskRun.tags)
</script>