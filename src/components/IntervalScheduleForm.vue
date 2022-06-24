<template>
  <p-form @submit="submit">
    <div class="interval-schedule-form__row">
      <p-label label="Value" class="interval-schedule-form__column--span-3">
        <p-number-input v-model="interval" />
      </p-label>

      <p-label label="Interval">
        <p-select v-model="intervalOption" :options="intervalOptions" />
      </p-label>
    </div>

    <div class="interval-schedule-form__row">
      <p-label label="Start date" class="interval-schedule-form__column--span-2">
        <p-date-input v-model="anchorDate" show-time />
      </p-label>

      <p-label label="Timezone" class="interval-schedule-form__column--span-2">
        <TimezoneSelect v-model="timezone" />
      </p-label>
    </div>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <p-button type="submit">
        Save
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { minutesInHour, secondsInMinute } from 'date-fns'
  import { computed, ref } from 'vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  import { IntervalSchedule } from '@/models'

  const hoursInDay = 24

  type IntervalOption = 'Seconds' | 'Minutes' | 'Hours' | 'Days'

  const intervalOptionsToSecondsMap: Record<IntervalOption, number> = {
    'Seconds': 1,
    'Minutes': secondsInMinute,
    'Hours': secondsInMinute * minutesInHour,
    'Days': secondsInMinute * minutesInHour * hoursInDay,
  }

  const secondsToClosestIntervalValue = (interval: number): number => {
    const days = interval / intervalOptionsToSecondsMap.Days
    const hours = interval / intervalOptionsToSecondsMap.Hours
    const minutes = interval / intervalOptionsToSecondsMap.Minutes
    const seconds = interval / intervalOptionsToSecondsMap.Seconds


    if (days > 1) {
      return days
    } else if (hours > 1) {
      return hours
    } else if (minutes > 1) {
      return minutes
    }

    return seconds
  }

  const secondsToClosestIntervalOption = (interval: number): IntervalOption => {
    const days = interval / intervalOptionsToSecondsMap.Days
    const hours = interval / intervalOptionsToSecondsMap.Hours
    const minutes = interval / intervalOptionsToSecondsMap.Minutes


    if (days > 1) {
      return 'Days'
    } else if (hours > 1) {
      return 'Hours'
    } else if (minutes > 1) {
      return 'Minutes'
    }
    return 'Seconds'
  }

  const props = defineProps<{
    schedule: IntervalSchedule | null,
  }>()

  const emit = defineEmits<{
    (event: 'cancel'): void,
    (event: 'submit', value: IntervalSchedule): void,
  }>()

  const defaultInterval = 3600

  const anchorDate = ref(props.schedule?.anchorDate ?? new Date())
  const timezone = ref(props.schedule?.timezone ?? 'UTC')
  const interval = ref(secondsToClosestIntervalValue(props.schedule?.interval ?? defaultInterval))
  const intervalOption = ref<IntervalOption>(secondsToClosestIntervalOption(props.schedule?.interval ?? defaultInterval))


  const intervalOptions: IntervalOption[] = ['Seconds', 'Minutes', 'Hours', 'Days']

  const intervalSeconds = computed(() => {
    return interval.value / intervalOptionsToSecondsMap[intervalOption.value]
  })

  const internalValue = computed(() => {
    return new IntervalSchedule({
      interval: intervalSeconds.value,
      anchorDate: anchorDate.value,
      timezone: timezone.value,
    })
  })

  const cancel = (): void => {
    emit('cancel')
  }

  const submit = (): void => {
    emit('submit', internalValue.value)
  }
</script>

<style>
.interval-schedule-form__row {
  @apply
  grid
  gap-4
}

@screen md {
  .interval-schedule-form__row {
    @apply
    grid
    gap-2
    grid-cols-4;
  }

  .interval-schedule-form__column--span-2 {
    @apply
    col-span-2
  }

  .interval-schedule-form__column--span-3 {
    @apply
    col-span-3
  }
}
</style>