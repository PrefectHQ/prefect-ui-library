<template>
  <p-button class="run-button" inset @click="run(deployment)">
    Run
    <p-icon class="run-button__run-icon" icon="PlayIcon" solid />
  </p-button>
</template>

<script lang="ts" setup>
  import  { PButton, showToast } from '@prefecthq/prefect-design'
  import { Deployment } from '@/models'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { inject } from '@/utilities'

  defineProps<{
    deployment: Deployment,
  }>()

  const deploymentsApi = inject(deploymentsApiKey)

  const run = async (deployment: Deployment): Promise<void> => {
    try {
      await deploymentsApi.createDeploymentFlowRun(deployment.id, {
        state: {
          type: 'scheduled',
          message: 'Run through UI',
        },
      },
      )
      showToast('Flow run scheduled', 'success')
    } catch (errorMessage) {
      showToast('Failed to schedule flow run', 'error')
    }
  }
</script>

<style>
.run-button__run-icon { @apply
  w-5
  h-5
}
</style>

