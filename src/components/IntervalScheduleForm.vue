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

    <template v-if="!hideActions" #footer>
      <slot name="footer" :disabled="disabled">
        <p-button inset @click="cancel">
          Cancel
        </p-button>
        <p-button :disabled="disabled" type="submit">
          Save
        </p-button>
      </slot>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { useField } from 'vee-validate'
  import { computed, ref, withDefaults, watch, onMounted } from 'vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  import { IntervalSchedule } from '@/models'
  import { isRequired, withMessage } from '@/services/validate'
  import { toPluralString } from '@/utilities'
  import { IntervalOption, secondsToClosestIntervalOption, secondsToClosestIntervalValue, intervalOptionsToSecondsMap } from '@/utilities/timeIntervals'

  const props = withDefaults(defineProps<{
    hideActions?: boolean,
    schedule?: IntervalSchedule,
  }>(), {
    schedule: () => new IntervalSchedule({ interval: 3600, anchorDate: new Date(), timezone: 'UTC' }),
  })

  const emit = defineEmits<{
    (event: 'cancel'): void,
    (event: 'update:schedule' | 'submit', value: IntervalSchedule): void,
    (event: 'update:disabled', value: boolean): void,
  }>()

  const rules = {
    interval: [withMessage(isRequired, 'An interval is required')],
  }

  const anchorDate = ref(props.schedule.anchorDate)
  const timezone = ref(props.schedule.timezone)
  const { value: interval, meta: intervalState, errors: intervalErrors } = useField<number>('interval', rules.interval, { initialValue: secondsToClosestIntervalValue(props.schedule.interval) })
  const intervalOption = ref<IntervalOption>(secondsToClosestIntervalOption(props.schedule.interval))

  const intervalOptions = computed <SelectOption[]>(() => {
    const singularOptions = ['Second', 'Minute', 'Hour', 'Day']

    return singularOptions.map(option => {
      return {
        label: toPluralString(option, interval.value),
        value: toPluralString(option),
      }
    })
  })

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

  watch(() => internalValue.value, () => emit('update:schedule', internalValue.value))
  watch(() => disabled.value, () => emit('update:disabled', disabled.value))
  watch(() => props.schedule, (val: IntervalSchedule | null, oldVal: IntervalSchedule | null) => {
    anchorDate.value = val?.anchorDate ?? anchorDate.value
    timezone.value = val?.timezone ?? timezone.value

    if (val && !oldVal) {
      interval.value = secondsToClosestIntervalValue(val.interval)
      intervalOption.value = secondsToClosestIntervalOption(val.interval)
    }
  }, { deep: true })

  onMounted(() => {
    emit('update:disabled', disabled.value)
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