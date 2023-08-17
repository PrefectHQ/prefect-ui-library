<template>
  <p-form @submit="submit">
    <p-content>
      <div class="cron-schedule-form__row">
        <p-label label="Value" class="cron-schedule-form__column--span-3" :state="cronState">
          <p-text-input v-model="cron" />

          <template #message>
            {{ cronErrors?.[0] ?? internalValue }}
          </template>
        </p-label>

        <p-label class="cron-schedule-form__column--span-1">
          <template #label>
            <span>
              Day Or
              <DayOrDescriptionModal />
            </span>
          </template>

          <p-toggle v-model="dayOr" class="inline-block" />
        </p-label>
      </div>

      <div class="cron-schedule-form__row">
        <p-label label="Timezone" class="cron-schedule-form__column--span-2">
          <TimezoneSelect v-model="timezone" />
        </p-label>
      </div>
    </p-content>

    <template v-if="!hideActions" #footer>
      <slot name="footer" :disabled="disabled">
        <p-button @click="cancel">
          Cancel
        </p-button>
        <p-button primary :disabled="disabled" type="submit">
          Save
        </p-button>
      </slot>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useField } from 'vee-validate'
  import { computed, ref, watch, onMounted } from 'vue'
  import DayOrDescriptionModal from '@/components/DayOrDescriptionModal.vue'
  import TimezoneSelect from '@/components/TimezoneSelect.vue'
  import { CronSchedule } from '@/models'
  import { containsCronRandomExpression } from '@/types/cron'
  import { isRequired, ValidationMethod } from '@/utilities/validation'

  const props = withDefaults(defineProps<{
    hideActions?: boolean,
    schedule?: CronSchedule,
  }>(), {
    schedule: () => new CronSchedule({ cron: '* * * * *', dayOr: true, timezone: 'UTC' }),
  })

  const emit = defineEmits<{
    (event: 'cancel'): void,
    (event: 'update:schedule' | 'submit', value: CronSchedule): void,
    (event: 'update:disabled', value: boolean): void,
  }>()

  const isSupportedCron: ValidationMethod = () => {
    if (containsCronRandomExpression(cron.value)) {
      return 'Unsupported expression'
    }

    return true
  }

  const isValidCron: ValidationMethod = () => {
    const val = internalValue.value.toString()
    const valid = val !== '' && val.toLowerCase() !== 'invalid'

    if (!valid) {
      return 'Invalid expression'
    }

    return true
  }

  const rules = {
    cron: [
      isRequired('Expression'),
      isValidCron,
      isSupportedCron,
    ],
  }

  const { value: cron, meta: cronState, errors: cronErrors } = useField<string>('cron', rules.cron, { initialValue: props.schedule.cron })
  const timezone = ref(props.schedule.timezone)
  const dayOr = ref(props.schedule.dayOr)

  const internalValue = computed(() => {
    return new CronSchedule({
      cron: cron.value,
      dayOr: dayOr.value,
      timezone: timezone.value,
    })
  })

  const disabled = computed(() => {
    return cronErrors.value.length > 0
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

  watch(() => props.schedule, (val) => {
    timezone.value = val.timezone ?? timezone.value
    cron.value = val.cron
    dayOr.value = val.dayOr
  }, { deep: true })

  onMounted(() => {
    emit('update:disabled', disabled.value)
    emit('update:schedule', internalValue.value)
  })
</script>

<style>
.cron-schedule-form__row {
  @apply
  grid
  gap-4
  grid-cols-1
}

@screen md {
  .cron-schedule-form__row {
    @apply
    grid
    gap-2
    grid-cols-4
  }

  .cron-schedule-form__column--span-full {
    @apply
    col-span-full
  }

  .cron-schedule-form__column--span-2 {
    @apply
    col-span-2
  }

  .cron-schedule-form__column--span-3 {
    @apply
    col-span-3
  }
}
</style>