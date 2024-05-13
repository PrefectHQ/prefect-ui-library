<template>
  <p-content class="automation-trigger-flow-run-state-input">
    <p-label label="Flows">
      <template #default="{ id }">
        <FlowCombobox :id="id" v-model:selected="flowIds" empty-message="All flows" />
      </template>
    </p-label>
    <template v-if="flowIds.length === 0">
      <p-label label="Flow Run Tags">
        <template #default="{ id }">
          <p-tags-input :id="id" v-model="tags" empty-message="All tags" />
        </template>
      </p-label>
    </template>
    <p-label label="Flow Run">
      <div class="automation-trigger-flow-run-state-input__states">
        <AutomationTriggerEventPostureSelect v-model:selected="posture" />
        <StateNameSelect v-model:selected="states" multiple empty-message="Any state" />
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
  import { AutomationTriggerEvent, DEFAULT_EVENT_TRIGGER_WITHIN } from '@/automations/types/automationTriggerEvent'
  import FlowCombobox from '@/components/FlowCombobox.vue'
  import StateNameSelect from '@/components/StateNameSelect.vue'
  import { mapper } from '@/services'

  const trigger = defineModel<AutomationTriggerEvent>('trigger', { required: true })

  const formValues = computed({
    get() {
      return mapper.map('AutomationTrigger', trigger.value, 'FlowRunStateTrigger')
    },
    set(value) {
      trigger.value = mapper.map('FlowRunStateTrigger', value, 'AutomationTrigger')
    },
  })

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

  const flowIds = computed({
    get() {
      return formValues.value.flowIds
    },
    set(value) {
      if (value.length > 0) {
        formValues.value = { ...formValues.value, flowIds: value, tags: [] }
      }
      formValues.value = { ...formValues.value, flowIds: value }
    },
  })

  const tags = usePatchRef(formValues, 'tags')
  const states = usePatchRef(formValues, 'states')
  const time = usePatchRef(formValues, 'time')
</script>

<style>
.automation-trigger-flow-run-state-input__states { @apply
  grid
  gap-2;
  grid-template-columns: 10rem 1fr;
}
</style>