<template>
  <p-select v-model="internalSelected" class="automation-trigger-event-posture-select" :options="options" />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { automationTriggerEventPosture } from '@/automations/types/api/triggers'
  import { AutomationTriggerEventPosture, getAutomationTriggerEventPostureLabel } from '@/automations/types/automationTriggerEvent'
  import { capitalize } from '@/utilities'

  type PostureOption = SelectOption & {
    value: AutomationTriggerEventPosture,
  }

  const props = defineProps<{
    selected: AutomationTriggerEventPosture,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: AutomationTriggerEventPosture): void,
  }>()

  const options: PostureOption[] = automationTriggerEventPosture.map(posture => ({
    label: capitalize(getAutomationTriggerEventPostureLabel(posture)),
    value: posture,
  }))

  const internalSelected = computed({
    get() {
      return props.selected
    },
    set(value) {
      emit('update:selected', value)
    },
  })
</script>