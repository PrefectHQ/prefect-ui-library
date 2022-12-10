<template>
  <p-overflow-menu-item @click="run">
    <slot>
      Quick run
    </slot>
  </p-overflow-menu-item>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { h } from 'vue'
  import { useRouter } from 'vue-router'
  import ToastFlowRunCreate from './ToastFlowRunCreate.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'

  const props = defineProps<{
    deploymentId: string,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()

  const run = async (): Promise<void> => {
    try {
      const flowRun = await api.deployments.createDeploymentFlowRun(props.deploymentId, {
        state: {
          type: 'scheduled',
          message: 'Run from the Prefect UI with defaults',
        },
      })

      const toastMessage = h(ToastFlowRunCreate, { flowRun, flowRunRoute: routes.flowRun, router, immediate: true })
      showToast(toastMessage, 'success')
    } catch (error) {
      showToast(localization.error.scheduleFlowRun, 'error')
      console.error(error)
    }
  }
</script>