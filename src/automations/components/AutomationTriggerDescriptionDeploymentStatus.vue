<template>
  <!--
    Examples
    • When any deployment stays in not ready for 30 seconds
    • When deployment my deployment enters ready
    • When deployments my deployment or my other deployment enters ready
  -->
  <div class="automation-trigger-description-deployment-status">
    When

    <template v-if="anyDeployment">
      any deployment
    </template>

    <template v-else>
      {{ toPluralString("deployment", trigger.deployments.length) }}

      <template v-for="(deploymentId, index) in trigger.deployments" :key="deploymentId">
        <DeploymentIconText :deployment-id />
        <template v-if="index < trigger.deployments.length - 1">
          or
        </template>
      </template>
    </template>

    {{ getAutomationTriggerEventPostureLabel(trigger.posture) }} {{ getDeploymentStatusLabel(trigger.status) }}

    <template v-if="trigger.posture === 'Proactive'">
      for {{ secondsToString(trigger.time) }}
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { toPluralString } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { DeploymentStatusTrigger } from '@/automations/types'
  import { getAutomationTriggerEventPostureLabel } from '@/automations/types/automationTriggerEvent'
  import DeploymentIconText from '@/components/DeploymentIconText.vue'
  import { getDeploymentStatusLabel } from '@/models/DeploymentStatus'
  import { secondsToString } from '@/utilities/seconds'

  const { trigger } = defineProps<{
    trigger: DeploymentStatusTrigger,
  }>()

  const anyDeployment = computed(() => trigger.deployments.length === 0)
</script>

<style>
.automation-trigger-description-deployment-status { @apply
  flex
  flex-wrap
  gap-1
  items-center
}
</style>