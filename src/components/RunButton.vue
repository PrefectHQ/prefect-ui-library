<template>
  <p-button
    v-if="can.create.flow_run"
    class="run-button"
    inset
    :loading="loading"
    :disabled="deployment.deprecated"
    @click="run(deployment)"
  >
    Run
    <p-icon class="run-button__run-icon" icon="PlayIcon" solid />
  </p-button>
</template>

<script lang="ts" setup>
  import  { PButton, showToast } from '@prefecthq/prefect-design'
  import { ref, h } from 'vue'
  import { useRouter } from 'vue-router'
  import ToastFlowRunCreate from './ToastFlowRunCreate.vue'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { flowRunRouteKey } from '@/router/routes'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'

  defineProps<{
    deployment: Deployment,
  }>()

  const can = inject(canKey)
  const deploymentsApi = inject(deploymentsApiKey)
  const loading = ref(false)
  const flowRun = ref()

  const router = useRouter()
  const flowRunRoute = inject(flowRunRouteKey)

  const run = async (deployment: Deployment): Promise<void> => {
    loading.value = true

    try {
      flowRun.value = await deploymentsApi.createDeploymentFlowRun(deployment.id, {
        state: {
          type: 'SCHEDULED',
          message: 'Run through UI',
        },
      },
      )
      const toastMessage = h(ToastFlowRunCreate, { flowRun: flowRun.value, flowRunRoute, router })
      showToast(toastMessage, 'success')
    } catch (error) {
      showToast(localization.error.scheduleFlowRun, 'error')
      console.warn(error)
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

