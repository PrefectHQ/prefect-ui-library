<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" :title="schedule ? 'Edit schedule' : 'Add schedule'">
    <p-label label="Schedule type">
      <p-button-group v-model="scheduleForm" :options="scheduleFormOptions" small />
    </p-label>

    <template v-if="scheduleForm == 'rrule'">
      <p>
        Sorry, modifying RRule schedules via the UI is currently unsupported; select a different schedule type above or modify your schedule in code.
      </p>
    </template>

    <template v-else-if="scheduleForm == 'cron'">
      <CronScheduleForm v-model:schedule="cronSchedule" v-model:disabled="cronDisabled" hide-actions @submit="submit" />
    </template>

    <template v-else-if="scheduleForm == 'interval'">
      <IntervalScheduleForm v-model:schedule="intervalSchedule" v-model:disabled="intervalDisabled" hide-actions @submit="submit" />
    </template>

    <!-- <p-toggle v-model="" /> -->

    <template #actions>
      <p-button primary type="submit" :disabled="disabled" @click="submitCurrentForm">
        Save
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, ref, watch } from 'vue'
  import CronScheduleForm from '@/components/CronScheduleForm.vue'
  import IntervalScheduleForm from '@/components/IntervalScheduleForm.vue'
  import { useShowModal } from '@/compositions'
  import { DeploymentScheduleCompat, getScheduleType, ScheduleType, isCronSchedule, isIntervalSchedule, CronSchedule, IntervalSchedule } from '@/models'

  const { showModal, open, close } = useShowModal()

  const props = defineProps<{
    schedule: DeploymentScheduleCompat | null,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentScheduleCompat): void,
  }>()

  const submit = (schedule: DeploymentScheduleCompat): void => {
    emit('submit', schedule)
    close()
  }

  const cronDisabled = ref<boolean>()
  const intervalDisabled = ref<boolean>()
  const disabled = computed(() => {
    return scheduleForm.value == 'rrule' || scheduleForm.value == 'cron' && cronDisabled.value || scheduleForm.value == 'interval' && intervalDisabled.value
  })

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
  const scheduleForm = ref<ScheduleType>(getScheduleType(props.schedule.schedule) ?? 'interval')
  const scheduleFormOptions: ButtonGroupOption[] = [{ label: 'Interval', value: 'interval' }, { label: 'Cron', value: 'cron' }, { label: 'RRule', value: 'rrule' }]

  const updateSchedules = (): void => {
    cronSchedule.value = isCronSchedule(props.schedule) ? props.schedule : undefined
    intervalSchedule.value = isIntervalSchedule(props.schedule) ? props.schedule : undefined
  }
  watch(() => props.schedule, updateSchedules)
</script>