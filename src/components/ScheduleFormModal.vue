<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" :title="schedule ? 'Edit schedule' : 'Add schedule'">
    <template v-if="currentScheduleForm == 'rrule'">
      <p>
        Sorry, modifying RRule schedules via the UI is currently unsupported.
      </p>
    </template>

    <template v-else-if="currentScheduleForm == 'cron'">
      <CronScheduleForm :schedule="schedule" hide-actions @submit="submit" />
    </template>

    <template v-else-if="currentScheduleForm == 'interval'">
      <IntervalScheduleForm :schedule="schedule" hide-actions @submit="submit" />
    </template>

    <template v-else>
      <p-button-group v-model="currentScheduleForm" :options="scheduleFormOptions" />
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
  import { Schedule, getScheduleType, ScheduleType } from '@/models'

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

  const currentScheduleForm = ref<ScheduleType>(getScheduleType(props.schedule) ?? 'cron')

  const scheduleFormOptions: ButtonGroupOption[] = [{ label: 'Cron', value: 'cron' }, { label: 'Interval', value: 'interval' }]
</script>