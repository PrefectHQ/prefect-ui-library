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
              <sup>
                <DayOrDescriptionModal class="cron-schedule-form__more-info" />
              </sup>
            </span>
          </template>
          <span>
            <p-toggle v-model="dayOr" class="inline-block" />
          </span>
        </p-label>
      </div>

      <div class="cron-schedule-form__row">
        <p-label label="Timezone" class="cron-schedule-form__column--span-2">
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
  import { useField } from 'vee-validate'
  import { computed, ref, watch } from 'vue'
  import DayOrDescriptionModal from './DayOrDescriptionModal.vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  import { CronSchedule } from '@/models'
  import { isRequired, withMessage } from '@/services/validate'
  import { containsCronRandomExpression } from '@/types/cron'

  const props = defineProps<{
    schedule: CronSchedule | null,
  }>()

  const emit = defineEmits<{
    (event: 'cancel'): void,
    (event: 'update:schedule' | 'submit', value: CronSchedule): void,
  }>()

  const defaultCron = '* * * * *'

  const isSupportedCron = (): boolean => {
    return !containsCronRandomExpression(cron.value)
  }

  const isValidCron = (): boolean => {
    const val = internalValue.value.toString()
    return val !== '' && val.toLowerCase() !== 'invalid'
  }

  const rules = {
    cron: [
      withMessage(isRequired, 'An expression is required'),
      withMessage(isValidCron, 'Invalid expression'),
      withMessage(isSupportedCron, 'Unsupported expression'),
    ],
  }

  const timezone = ref(props.schedule?.timezone ?? 'UTC')

  const { value: cron, meta: cronState, errors: cronErrors } = useField<string>('cron', rules.cron, { initialValue: props.schedule?.cron ?? defaultCron })
  const dayOr = ref(props.schedule?.dayOr ?? true)


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

  watch(() => internalValue.value, () => {
    if (disabled.value) {
      return
    }

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

.cron-schedule-form__more-info {
  @apply
  inline-block
  w-4
  h-4
}
</style>