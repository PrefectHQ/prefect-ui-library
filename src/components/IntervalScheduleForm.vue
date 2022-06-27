<template>
  <p-form @submit="submit">
    <p-content>
      <div class="interval-schedule-form__row">
        <p-label
          label="Value"
          class="interval-schedule-form__column--span-3"
          :message="intervalErrors?.[0]"
          :state="intervalState"
        >
          <p-number-input v-model="interval" min="1" step="1" />
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
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <p-button :disabled="disabled" type="submit">
        Save
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { minutesInHour, secondsInMinute } from 'date-fns'
  import { useField } from 'vee-validate'
  import { computed, ref, watch } from 'vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  import { IntervalSchedule } from '@/models'
  import { isRequired, withMessage } from '@/services/validate'

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
    schedule?: IntervalSchedule | null,
  }>()

  const emit = defineEmits<{
    (event: 'cancel'): void,
    (event: 'update:schedule' | 'submit', value: IntervalSchedule): void,
  }>()

  const defaultInterval = 3600

  const rules = {
    interval: [withMessage(isRequired, 'An interval is required')],
  }

  const anchorDate = ref(props.schedule?.anchorDate ?? new Date())
  const timezone = ref(props.schedule?.timezone ?? 'UTC')
  const { value: interval, meta: intervalState, errors: intervalErrors } = useField<number>('interval', rules.interval, { initialValue: secondsToClosestIntervalValue(props.schedule?.interval ?? defaultInterval) })
  const intervalOption = ref<IntervalOption>(secondsToClosestIntervalOption(props.schedule?.interval ?? defaultInterval))

  const intervalOptions: IntervalOption[] = ['Seconds', 'Minutes', 'Hours', 'Days']

  const intervalSeconds = computed(() => {
    return interval.value * intervalOptionsToSecondsMap[intervalOption.value]
  })

  const internalValue = computed(() => {
    return new IntervalSchedule({
      interval: intervalSeconds.value,
      anchorDate: anchorDate.value,
      timezone: timezone.value,
    })
  })

  const disabled = computed(() => {
    return intervalErrors.value.length > 0
  })


  const cancel = (): void => {
    emit('cancel')
  }

  const submit = (): void => {
    if (disabled.value) {
      return
    }

    emit('submit', internalValue.value)
  }

  watch(() => internalValue.value, () => {
    if (disabled.value) {
      return
    }

    emit('update:schedule', internalValue.value)
  })
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