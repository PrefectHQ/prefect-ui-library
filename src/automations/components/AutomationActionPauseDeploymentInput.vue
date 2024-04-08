<template>
  <p-content class="automation-action-pause-deployment-input">
    <p-label label="Deployment To Pause">
      <template #default="{ id }">
        <AutomationDeploymentCombobox :id="id" v-model:selected="deploymentId" allow-unset />
      </template>
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationDeploymentCombobox from '@/automations/components/AutomationDeploymentCombobox.vue'
  import { AutomationActionPauseDeployment } from '@/automations/types/actions'

  const props = defineProps<{
    action: Partial<AutomationActionPauseDeployment>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionPauseDeployment>): void,
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