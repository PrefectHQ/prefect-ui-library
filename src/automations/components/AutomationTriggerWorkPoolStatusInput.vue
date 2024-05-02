<template>
  <p-content class="automation-trigger-work-pool-status-input">
    <p-label label="Work Pools">
      <template #default="{ id }">
        <AutomationWorkPoolCombobox :id="id" v-model:selected="workPools" empty-message="All work pools" />
      </template>
    </p-label>
    <p-label label="Work Pool">
      <div class="automation-trigger-work-pool-status-input__status">
        <AutomationTriggerEventPostureSelect v-model:selected="posture" />
        <WorkPoolStatusSelect v-model:selected="status" />
      </div>
    </p-label>
    <AutomationWithinInput v-if="posture === 'Proactive'" v-model:time="time" :posture />
  </p-content>
</template>

<script lang="ts" setup>
  import { usePatchRef } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import AutomationTriggerEventPostureSelect from '@/automations/components/AutomationTriggerEventPostureSelect.vue'
  import AutomationWithinInput from '@/automations/components/AutomationWithinInput.vue'
  import AutomationWorkPoolCombobox from '@/automations/components/AutomationWorkPoolCombobox.vue'
  import { AutomationTriggerEvent, DEFAULT_EVENT_TRIGGER_WITHIN } from '@/automations/types/automationTriggerEvent'
  import WorkPoolStatusSelect from '@/components/WorkPoolStatusSelect.vue'
  import { mapper } from '@/services/Mapper'

  const trigger = defineModel<AutomationTriggerEvent>('trigger', { required: true })

  const formValues = computed({
    get() {
      return mapper.map('AutomationTrigger', trigger.value, 'WorkPoolStatusTrigger')
    },
    set(value) {
      trigger.value = mapper.map('WorkPoolStatusTrigger', value, 'AutomationTrigger')
    },
  })

  const workPools = usePatchRef(formValues, 'workPools')
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
.automation-trigger-work-pool-status-input__status { @apply
  grid
  gap-2;
  grid-template-columns: 10rem 1fr;
}
</style>