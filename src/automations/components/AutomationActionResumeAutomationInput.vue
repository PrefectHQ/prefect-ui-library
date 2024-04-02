<template>
  <p-content class="automation-action-resume-automation-input">
    <p-label label="Automation To Resume">
      <template #default="{ id }">
        <AutomationAutomationCombobox :id="id" v-model:selected="automationId" allow-unset />
      </template>
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationAutomationCombobox from '@/automations/components/AutomationAutomationCombobox.vue'
  import { AutomationActionResumeAutomation } from '@/automations/types/actions'

  const props = defineProps<{
    action: Partial<AutomationActionResumeAutomation>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionResumeAutomation>): void,
  }>()

  const automationId = computed({
    get() {
      return props.action.automationId ?? null
    },
    set(automationId) {
      emit('update:action', { ...props.action, automationId })
    },
  })
</script>