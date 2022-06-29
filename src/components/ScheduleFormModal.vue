<template>
  <p-modal v-model:showModal="showModal" :title="schedule ? 'Edit schedule' : 'Add schedule'">
    <template v-if="currentScheduleForm == 'rrule'">
      <p>
        Sorry, modifying RRule schedules via the UI is currently unsupported.
      </p>
    </template>

    <template v-else-if="currentScheduleForm == 'cron'">
      <CronScheduleForm :schedule="schedule" />
    </template>

    <template v-else-if="currentScheduleForm == 'interval'">
      <IntervalScheduleForm :schedule="schedule" />
    </template>

    <template v-else>
      <p-button-group v-model="currentScheduleForm" :options="scheduleFormOptions" />
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import CronScheduleForm from './CronScheduleForm.vue'
  import IntervalScheduleForm from './IntervalScheduleForm.vue'
  import { useShowModal } from '@/compositions'
  import { Schedule, getScheduleType, ScheduleType } from '@/models'

  const { showModal, open, close } = useShowModal()

  const props = defineProps<{
    schedule?: Schedule,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: Schedule | null): void,
    (event: 'cancel'): void,
  }>()

  const currentScheduleForm = ref<ScheduleType>(getScheduleType(props.schedule) ?? 'interval')

  const scheduleFormOptions: ButtonGroupOption[] = [{ label: 'Cron', value: 'cron' }, { label: 'Interval', value: 'interval' }]
</script>