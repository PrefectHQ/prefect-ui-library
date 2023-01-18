<template>
  <div class="schedule-fieldset">
    <div v-if="internalValue" class="schedule-fieldset__schedule">
      {{ internalValue.toString({ verbose: true }) }}
    </div>

    <template v-if="can.update.deployment">
      <div class="schedule-fieldset__buttons">
        <ScheduleFormModal :schedule="internalValue" @submit="updateSchedule">
          <template #default="{ open }">
            <p-button size="xs" class="schedule-fieldset__button" :disabled="loading" inset @click="open">
              <p-icon icon="PencilIcon" class="schedule-fieldset__button-icon" />
              {{ internalValue ? 'Edit' : 'Add' }}
            </p-button>
          </template>
        </ScheduleFormModal>

        <p-button
          v-if="internalValue"
          size="xs"
          class="schedule-fieldset__button"
          inset
          :disabled="loading"
          @click="removeSchedule"
        >
          <p-icon icon="TrashIcon" class="schedule-fieldset__button-icon" />
          Remove
        </p-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import ScheduleFormModal from '@/components/ScheduleFormModal.vue'
  import { useCan } from '@/compositions/useCan'
  import { Schedule } from '@/models'

  const props = defineProps<{
    modelValue: Schedule | null,
    loading?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: Schedule | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value: Schedule | null) {
      emit('update:modelValue', value)
    },
  })

  const can = useCan()

  const updateSchedule = (schedule: Schedule | null): void => {
    internalValue.value = schedule
  }

  const removeSchedule = (): void => {
    internalValue.value = null
  }
</script>

<style>
.schedule-fieldset__button { @apply
  max-w-fit
}

.schedule-fieldset__schedule { @apply
  flex
  gap-2
  flex-col
}

.schedule-fieldset__buttons { @apply
  flex
  gap-2
}

.schedule-fieldset__button-icon { @apply
  w-3
  h-3
}
</style>