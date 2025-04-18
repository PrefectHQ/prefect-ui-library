<template>
  <div class="schedule-fieldset">
    <div v-if="internalValue" class="schedule-fieldset__schedule">
      {{ internalValue.toString({ verbose: true }) }}
    </div>

    <template v-if="!readonly">
      <div class="schedule-fieldset__buttons">
        <ScheduleFormModal
          :slug="null"
          :active="null"
          :schedule="internalValue"
          :job-variables="{}"
          :deployment-parameters="{}"
          :schedule-parameters="{}"
          :parameter-open-api-schema="{}"
          @submit="updateSchedule"
        >
          <template #default="{ open }">
            <p-button size="sm" icon="PencilIcon" class="schedule-fieldset__button" :disabled="loading" @click="open">
              {{ internalValue ? 'Edit' : 'Add' }}
            </p-button>
          </template>
        </ScheduleFormModal>

        <p-button
          v-if="internalValue"
          size="sm"
          class="schedule-fieldset__button"
          icon="TrashIcon"
          :disabled="loading"
          @click="removeSchedule"
        >
          Remove
        </p-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import ScheduleFormModal from '@/components/ScheduleFormModal.vue'
  import { DeploymentScheduleCompatible, Schedule } from '@/models'
  import { computed } from 'vue'

  const props = defineProps<{
    modelValue: Schedule | null,
    loading?: boolean,
    readonly: boolean,
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

  const updateSchedule = (deploymentSchedule: DeploymentScheduleCompatible): void => {
    internalValue.value = deploymentSchedule.schedule
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
</style>