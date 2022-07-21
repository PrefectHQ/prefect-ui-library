<template>
  <p-button v-if="can.create.flow_run" class="run-button" inset :loading="loading" @click="run(deployment)">
    Run
    <p-icon class="run-button__run-icon" icon="PlayIcon" solid />
  </p-button>
</template>

<script lang="ts" setup>
  import  { PButton, showToast } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'

  defineProps<{
    deployment: Deployment,
  }>()

  const can = inject(canKey)
  const deploymentsApi = inject(deploymentsApiKey)
  const loading = ref(false)

  const run = async (deployment: Deployment): Promise<void> => {
    loading.value = true

    try {
      await deploymentsApi.createDeploymentFlowRun(deployment.id, {
        state: {
          type: 'scheduled',
          message: 'Run through UI',
        },
      })

      showToast(localization.success.scheduleFlowRun, 'success')
    } catch (error) {
      showToast(localization.error.scheduleFlowRun, 'error')

      console.error(error)
    } finally {
      loading.value = false
    }
  }
</script>

<style>
.run-button__run-icon { @apply
  w-5
  h-5
}
</style>

