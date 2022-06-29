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
      <CronScheduleForm v-model:schedule="cronSchedule" v-model:disabled="disabled" hide-actions @submit="submit" />
    </template>

    <template v-else-if="scheduleForm == 'interval'">
      <IntervalScheduleForm v-model:schedule="intervalSchedule" v-model:disabled="disabled" hide-actions @submit="submit" />
    </template>

    <template #actions>
      <p-button type="submit" :disabled="disabled" @click="submitCurrentForm">
        Save
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import CronScheduleForm from './CronScheduleForm.vue'
  import IntervalScheduleForm from './IntervalScheduleForm.vue'
  import { useShowModal } from '@/compositions'
  import { Schedule, getScheduleType, ScheduleType, isCronSchedule, isIntervalSchedule, CronSchedule, IntervalSchedule } from '@/models'

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

  const disabled = ref<boolean>()

  const submitCurrentForm = (): void => {
    if (disabled.value) {
      return
    }

    if (scheduleForm.value == 'cron' && cronSchedule.value) {
      submit(cronSchedule.value)
    }

    if (scheduleForm.value == 'interval' && intervalSchedule.value) {
      submit(intervalSchedule.value)
    }
  }

  const cronSchedule = ref<CronSchedule | undefined>(isCronSchedule(props.schedule) ? props.schedule : undefined)
  const intervalSchedule = ref<IntervalSchedule | undefined>(isIntervalSchedule(props.schedule) ? props.schedule : undefined)
  const scheduleForm = ref<ScheduleType>(getScheduleType(props.schedule) ?? 'interval')
  const scheduleFormOptions: ButtonGroupOption[] = [{ label: 'Interval', value: 'interval' }, { label: 'Cron', value: 'cron' }]
</script>