<template>
  <p-content class="automation-action-pause-work-pool-input">
    <p-label label="Work Pool To Pause">
      <template #default="{ id }">
        <AutomationWorkPoolCombobox :id="id" v-model:selected="workPoolId" allow-unset />
      </template>
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationWorkPoolCombobox from '@/automations/components/AutomationWorkPoolCombobox.vue'
  import { AutomationActionPauseWorkPool } from '@/automations/types/actions'

  const props = defineProps<{
    action: Partial<AutomationActionPauseWorkPool>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionPauseWorkPool>): void,
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