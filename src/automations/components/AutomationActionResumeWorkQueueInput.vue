<template>
  <p-content class="automation-action-resume-work-queue">
    <p-label label="Work Queue To Resume">
      <template #default="{ id }">
        <AutomationWorkQueueCombobox :id="id" v-model:selected="workQueueId" allow-unset />
      </template>
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationWorkQueueCombobox from '@/automations/components/AutomationWorkQueueCombobox.vue'
  import { AutomationActionResumeWorkQueue } from '@/automations/types/actions'

  const props = defineProps<{
    action: Partial<AutomationActionResumeWorkQueue>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionResumeWorkQueue>): void,
  }>()

  const workQueueId = computed({
    get() {
      return props.action.workQueueId ?? null
    },
    set(workQueueId) {
      emit('update:action', { ...props.action, workQueueId })
    },
  })
</script>