<template>
  <p-content class="automation-trigger-work-queue-status-input">
    <p-label v-slot="{ id }" label="Work Pools">
      <AutomationWorkPoolCombobox :id="id" v-model:selected="workPools" empty-message="All work pools" />
    </p-label>

    <p-label label="Work Queues">
      <template #default="{ id }">
        <AutomationWorkQueueCombobox :id="id" v-model:selected="workQueues" empty-message="All work queues" :work-pool-ids="workPools" />
      </template>
    </p-label>

    <p-label label="Work Queue">
      <div class="automation-trigger-work-queue-status-input__status">
        <AutomationTriggerEventPostureSelect v-model:selected="posture" />
        <WorkQueueStatusSelect v-model:selected="status" />
      </div>
    </p-label>

    <AutomationWithinInput v-if="posture === 'Proactive'" v-model:time="time" :posture="posture" />
  </p-content>
</template>

<script lang="ts" setup>
  import { usePatchRef } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import AutomationTriggerEventPostureSelect from '@/automations/components/AutomationTriggerEventPostureSelect.vue'
  import AutomationWithinInput from '@/automations/components/AutomationWithinInput.vue'
  import AutomationWorkPoolCombobox from '@/automations/components/AutomationWorkPoolCombobox.vue'
  import AutomationWorkQueueCombobox from '@/automations/components/AutomationWorkQueueCombobox.vue'
  import { AutomationTriggerEvent, DEFAULT_EVENT_TRIGGER_WITHIN } from '@/automations/types/automationTriggerEvent'
  import WorkQueueStatusSelect from '@/components/WorkQueueStatusSelect.vue'
  import { mapper } from '@/services'

  const trigger = defineModel<AutomationTriggerEvent>('trigger', { required: true })

  const formValues = computed({
    get() {
      return mapper.map('AutomationTrigger', trigger.value, 'WorkQueueStatusTrigger')
    },
    set(value) {
      trigger.value = mapper.map('WorkQueueStatusTrigger', value, 'AutomationTrigger')
    },
  })

  const workPools = usePatchRef(formValues, 'workPools')
  const workQueues = usePatchRef(formValues, 'workQueues')
  const status = usePatchRef(formValues, 'status')
  const time = usePatchRef(formValues, 'time')

  const posture = computed({
    get() {
      return formValues.value.posture
    },
    set(value) {
      if (value === 'Proactive' && time.value === DEFAULT_EVENT_TRIGGER_WITHIN) {
        formValues.value = { ...formValues.value, time: 30, posture: value }
        return
      }

      formValues.value = { ...formValues.value, posture: value }
    },
  })
</script>

<style>
.automation-trigger-work-queue-status-input__status { @apply
  grid
  gap-2;
  grid-template-columns: 10rem 1fr;
}
</style>