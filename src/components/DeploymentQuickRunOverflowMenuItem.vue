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
  import ToastFlowRunCreate from '@/components/ToastFlowRunCreate.vue'
  import { useWorkspaceApi, useWorkspaceRoutes, useNextFlowRun } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    deployment: Deployment,
    openModal: () => void,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()

  const { subscriptions: nextRunSubscription } = useNextFlowRun(() => ({
    deployments: {
      id: [props.deployment.id],
    },
  }))

  const run = async (): Promise<void> => {
    if (props.deployment.parameterOpenApiSchema.required && props.deployment.parameterOpenApiSchema.required.length > 0) {
      props.openModal()
    } else {
      try {
        const flowRun = await api.deployments.createDeploymentFlowRun(props.deployment.id, {
          state: {
            type: 'scheduled',
            message: 'Run from the Prefect UI with defaults',
          },
        })

        nextRunSubscription.refresh()
        const toastMessage = h(ToastFlowRunCreate, {
          flowRun,
          flowRunRoute: routes.flowRun,
          router,
          immediate: true,
        })
        showToast(toastMessage, 'success')
      } catch (error) {
        const message = getApiErrorMessage(error, localization.error.scheduleFlowRun)
        showToast(message, 'error')
        console.error(error)
      }
    }
  }
</script>