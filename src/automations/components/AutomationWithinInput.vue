<template>
  <p-label class="automation-within-input" label="For" :state="state" :message="error">
    <template #label="{ id }">
      <slot :id name="label" />
    </template>

    <template #default="{ id }">
      <DurationInput :id v-model="time" :state :min="0" />
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import { isDefined } from '@prefecthq/prefect-design'
  import { ValidationRule, useValidation } from '@prefecthq/vue-compositions'
  import { secondsInDay } from 'date-fns/constants'
  import { watch } from 'vue'
  import { AutomationTriggerEventPosture } from '@/automations/types/automationTriggerEvent'
  import DurationInput from '@/components/DurationInput.vue'

  const time = defineModel<number>('time', { required: true })

  const props = defineProps<{
    posture: AutomationTriggerEventPosture,
  }>()

  const { state, error, validate } = useValidation(time, 'time', [
    (value, name, meta) => {
      switch (props.posture) {
        case 'Proactive':
          if (isGreaterThanOrEqualTo(10)(value, name, meta) !== true) {
            return 'Time must be at least 10 seconds'
          }
          break
        case 'Reactive':
          if (isGreaterThanOrEqualTo(0)(value, name, meta) !== true) {
            return 'Time must be at least 0'
          }
          break
      }

      return true
    },

    isLessThanOrEqualTo(30 * secondsInDay),
  ])

  watch(() => props.posture, async () => await validate())

  function isGreaterThanOrEqualTo(min: number): ValidationRule<number> {
    return (value, name) => {
      if (!isDefined(value)) {
        return true
      }

      if (value >= min) {
        return true
      }

      return `${name} must be greater than or equal to ${min}`
    }
  }

  function isLessThanOrEqualTo(max: number): ValidationRule<number> {
    return (value) => {
      if (!isDefined(value)) {
        return true
      }

      if (value <= max) {
        return true
      }

      return 'Time cannot be greater than 30 days'
    }
  }
</script>