<template>
  <p-content class="automation-action-pause-work-queue">
    <p-label label="Work Queue To Pause">
      <template #default="{ id }">
        <AutomationWorkQueueCombobox :id="id" v-model:selected="workQueueId" allow-unset />
      </template>
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationWorkQueueCombobox from '@/automations/components/AutomationWorkQueueCombobox.vue'
  import { AutomationActionPauseWorkQueue } from '@/automations/types/actions'

  const props = defineProps<{
    action: Partial<AutomationActionPauseWorkQueue>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionPauseWorkQueue>): void,
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