<template>
  <div class="schedule-fieldset">
    <div v-if="schedule" class="schedule-fieldset__schedule">
      {{ schedule.toString({ verbose: true }) }}
    </div>

    <div class="schedule-fieldset__schedule-buttons">
      <ScheduleFormModal :schedule="schedule" @submit="updateSchedule">
        <template #default="{ open }">
          <p-button size="xs" class="schedule-fieldset__button" inset @click="open">
            <p-icon icon="PencilIcon" class="schedule-fieldset__button-icon" />
            {{ schedule ? 'Edit' : 'Add' }}
          </p-button>
        </template>
      </ScheduleFormModal>

      <p-button
        v-if="schedule"
        size="xs"
        class="schedule-fieldset__button"
        inset
        @click="removeSchedule"
      >
        <p-icon icon="TrashIcon" class="schedule-fieldset__button-icon" />
        Remove
      </p-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { Schedule } from '@/models'

  const props = defineProps<{
    modelValue?: Schedule,
    schedule?: Schedule | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: Schedule | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: Schedule | null) {
      emit('update:modelValue', value)
    },
  })

  const updateSchedule = (schedule: Schedule | null): void => {
    internalValue.value = schedule
  }

  const removeSchedule = (): void => {
    internalValue.value = null
  }
</script>

<style>
.schedule-fieldset__tag,
.schedule-fieldset__button {
  @apply max-w-fit
}

.schedule-fieldset__schedule {
  @apply flex gap-2 flex-col
}

.schedule-fieldset__buttons {
  @apply flex gap-2
}

.schedule-fieldset__button-icon {
  @apply w-3 h-3
}

.schedule-fieldset__tag {
  @apply bg-slate-500 text-white cursor-pointer
}

.schedule-fieldset__tag .p-tag__dismiss {
  @apply text-slate-100 hover: text-slate-900
}
</style>