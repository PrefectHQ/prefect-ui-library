<template>
  <p-content class="automation-action-resume-work-pool-input">
    <p-label label="Work Pool To Resume">
      <template #default="{ id }">
        <AutomationWorkPoolCombobox :id="id" v-model:selected="workPoolId" allow-unset />
      </template>
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationWorkPoolCombobox from '@/automations/components/AutomationWorkPoolCombobox.vue'
  import { AutomationActionResumeWorkPool } from '@/automations/types/actions'

  const props = defineProps<{
    action: Partial<AutomationActionResumeWorkPool>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionResumeWorkPool>): void,
  }>()

  const workPoolId = computed({
    get() {
      return props.action.workPoolId ?? null
    },
    set(workPoolId) {
      emit('update:action', { ...props.action, workPoolId })
    },
  })
</script>