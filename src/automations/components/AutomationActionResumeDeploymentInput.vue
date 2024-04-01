<template>
  <p-content class="automation-action-resume-deployment-input">
    <p-label label="Deployment To Resume">
      <template #default="{ id }">
        <AutomationDeploymentCombobox :id="id" v-model:selected="deploymentId" />
      </template>
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationDeploymentCombobox from '@/automations/components/AutomationDeploymentCombobox.vue'
  import { AutomationActionResumeDeployment } from '@/automations/types/actions'

  const props = defineProps<{
    action: Partial<AutomationActionResumeDeployment>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionResumeDeployment>): void,
  }>()

  const deploymentId = computed({
    get() {
      return props.action.deploymentId ?? null
    },
    set(deploymentId) {
      emit('update:action', { ...props.action, deploymentId })
    },
  })
</script>