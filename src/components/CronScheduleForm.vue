<template>
  <p-form @submit="submit">
    <div class="cron-schedule-form__row">
      <p-label label="Value" class="cron-schedule-form__column--span-full">
        <p-text-input v-model="cron" />

        <template #message>
          {{ internalValue }}
        </template>
      </p-label>
    </div>

    <div class="cron-schedule-form__row">
      <p-label label="Day OR Day of Week" class="cron-schedule-form__column--span-2">
        <p-toggle v-model="dayOr" />
      </p-label>

      <p-label label="Timezone" class="cron-schedule-form__column--span-2">
        <TimezoneSelect v-model="timezone" />
      </p-label>
    </div>
  </p-form>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  import { CronSchedule } from '@/models'

  const props = defineProps<{
    modelValue: CronSchedule | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: CronSchedule): void,
  }>()

  const defaultCron = '* * * * *'

  const timezone = ref(props.modelValue?.timezone ?? 'UTC')
  const cron = ref(props.modelValue?.cron ?? defaultCron)
  const dayOr = ref(props.modelValue?.dayOr ?? false)


  const internalValue = computed(() => {
    return new CronSchedule({
      cron: cron.value,
      dayOr: dayOr.value,
      timezone: timezone.value,
    })
  })

  const submit = (): void => {
    emit('update:modelValue', internalValue.value)
  }
</script>

<style>
.cron-schedule-form__row {
  @apply
  grid
  gap-2
  grid-cols-4;
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
</style>