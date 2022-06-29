<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" :title="schedule ? 'Edit schedule' : 'Add schedule'">
    <p-label label="Schedule type">
      <p-button-group v-model="scheduleForm" :options="scheduleFormOptions" size="sm" />
    </p-label>

    <template v-if="scheduleForm == 'rrule'">
      <p>
        Sorry, modifying RRule schedules via the UI is currently unsupported.
      </p>
    </template>

    <template v-else-if="scheduleForm == 'cron'">
      <CronScheduleForm :schedule="cronSchedule" hide-actions @submit="submit" />
    </template>

    <template v-else-if="scheduleForm == 'interval'">
      <IntervalScheduleForm :schedule="intervalSchedule" hide-actions @submit="submit" />
    </template>

    <template #actions>
      <p-button type="submit" @click="submit">
        Save
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import CronScheduleForm from './CronScheduleForm.vue'
  import IntervalScheduleForm from './IntervalScheduleForm.vue'
  import { useShowModal } from '@/compositions'
  import { Schedule, getScheduleType, ScheduleType, isCronSchedule, isIntervalSchedule } from '@/models'

  const { showModal, open, close } = useShowModal()

  const props = defineProps<{
    schedule?: Schedule,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: Schedule): void,
  }>()

  const submit = (schedule: Schedule): void => {
    emit('submit', schedule)
    close()
  }

  const cronSchedule = computed(() => {
    if (isCronSchedule(props.schedule)) {
      return props.schedule
    }

    return undefined
  })

  const intervalSchedule = computed(() => {
    if (isIntervalSchedule(props.schedule)) {
      return props.schedule
    }

    return undefined
  })

  const scheduleForm = ref<ScheduleType>(getScheduleType(props.schedule) ?? 'interval')
  const scheduleFormOptions: ButtonGroupOption[] = [{ label: 'Interval', value: 'interval' }, { label: 'Cron', value: 'cron' }]
</script>