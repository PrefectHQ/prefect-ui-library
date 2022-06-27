<template>
  <p-form @submit="submit">
    <p-content>
      <div class="cron-schedule-form__row">
        <p-label label="Value" class="cron-schedule-form__column--span-3">
          <p-text-input v-model="cron" />

          <template #message>
            {{ internalValue }}
          </template>
        </p-label>

        <p-label class="cron-schedule-form__column--span-1">
          <template #label>
            <span
              title="When the Day Or value is off, this schedule will connect day of the month and day of the week entries using OR logic; when on it will connect them using AND logic."
            >
              Day Or
              <sup>
                <p-icon icon="QuestionMarkCircleIcon" solid class="cron-schedule-form__more-info" />
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

    <template v-if="!hideFooter" #footer>
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
  import { computed, ref, watch } from 'vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  import { CronSchedule } from '@/models'

  const props = defineProps<{
    schedule: CronSchedule | null,
    hideFooter?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'cancel'): void,
    (event: 'update:schedule' | 'submit', value: CronSchedule): void,
  }>()

  const defaultCron = '* * * * *'

  const timezone = ref(props.schedule?.timezone ?? 'UTC')
  const cron = ref(props.schedule?.cron ?? defaultCron)
  const dayOr = ref(props.schedule?.dayOr ?? true)


  const internalValue = computed(() => {
    return new CronSchedule({
      cron: cron.value,
      dayOr: dayOr.value,
      timezone: timezone.value,
    })
  })

  const cancel = (): void => {
    emit('cancel')
  }

  const submit = (): void => {
    emit('submit', internalValue.value)
  }

  watch(() => internalValue.value, () => emit('update:schedule', internalValue.value))
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