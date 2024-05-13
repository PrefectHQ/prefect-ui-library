<template>
  <p-select v-model="internalSelected" class="automation-trigger-event-posture-select" :options="options" />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { AutomationTriggerEventPosture } from '@/automations/types/automationTriggerEvent'

  type PostureOption = SelectOption & {
    value: AutomationTriggerEventPosture,
  }

  const props = defineProps<{
    selected: AutomationTriggerEventPosture,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: AutomationTriggerEventPosture): void,
  }>()

  const options: PostureOption[] = [
    { label: 'Enters', value: 'Reactive' },
    { label: 'Stays in', value: 'Proactive' },
  ]

  const internalSelected = computed({
    get() {
      return props.selected
    },
    set(value) {
      emit('update:selected', value)
    },
  })
</script>