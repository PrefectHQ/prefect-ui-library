<template>
  <div class="automation-action-description-pause-resume-deployment">
    <template v-if="action.deploymentId">
      {{ pauseOrResume }} deployment: <DeploymentIconText :deployment-id="action.deploymentId" />
    </template>

    <template v-else>
      <span>{{ pauseOrResume }} deployment inferred from the trigger</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { AutomationActionPauseDeployment, AutomationActionResumeDeployment } from '@/automations/types/actions'
  import DeploymentIconText from '@/components/DeploymentIconText.vue'

  const props = defineProps<{
    action: AutomationActionResumeDeployment | AutomationActionPauseDeployment,
  }>()

  const pauseOrResume = computed(() => props.action.type === 'pause-deployment' ? 'Pause' : 'Resume')
</script>

<style>
.automation-action-description-pause-resume-deployment { @apply
  flex
  flex-wrap
  gap-1
  items-center
}
</style>