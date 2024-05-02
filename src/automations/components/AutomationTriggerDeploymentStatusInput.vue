<template>
  <p-content>
    <p-label label="Deployments">
      <template #default="{ id }">
        <AutomationDeploymentCombobox :id="id" v-model:selected="deployments" empty-message="All deployments" :allow-unset="false" />
      </template>
    </p-label>
    <p-label label="Deployment">
      <div class="automation-trigger-deployment-status__status">
        <AutomationTriggerEventPostureSelect v-model:selected="posture" />
        <DeploymentStatusSelect v-model:selected="status" />
      </div>
    </p-label>
    <AutomationWithinInput v-if="posture === 'Proactive'" v-model:time="time" :posture />
  </p-content>
</template>

<script lang="ts" setup>
  import { usePatchRef } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import AutomationDeploymentCombobox from '@/automations/components/AutomationDeploymentCombobox.vue'
  import AutomationTriggerEventPostureSelect from '@/automations/components/AutomationTriggerEventPostureSelect.vue'
  import AutomationWithinInput from '@/automations/components/AutomationWithinInput.vue'
  import { AutomationTriggerEvent, DEFAULT_EVENT_TRIGGER_WITHIN } from '@/automations/types/automationTriggerEvent'
  import DeploymentStatusSelect from '@/components/DeploymentStatusSelect.vue'
  import { mapper } from '@/services'

  const trigger = defineModel<AutomationTriggerEvent>('trigger', { required: true })

  const formValues = computed({
    get() {
      return mapper.map('AutomationTrigger', trigger.value, 'DeploymentStatusTrigger')
    },
    set(value) {
      trigger.value = mapper.map('DeploymentStatusTrigger', value, 'AutomationTrigger')
    },
  })

  const deployments = usePatchRef(formValues, 'deployments')
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
.automation-trigger-deployment-status__status { @apply
  grid
  gap-2;
  grid-template-columns: 10rem 1fr;
}
</style>