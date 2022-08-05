<template>
  <p-pop-over ref="popOver" class="run-menu" auto-close :placement="placement" @keydown.esc="esc">
    <template #target="{ toggle }">
      <p-button
        ref="runButton"
        class="run-menu__run-button"
        inset
        :loading="loading"
        :disabled="deployment.deprecated"
        @click="toggle"
      >
        Run
        <p-icon class="run-menu__run-icon" icon="PlayIcon" solid />
      </p-button>
    </template>
    <p-overflow-menu class="run-menu__overflow-menu" @click="close">
      <p-overflow-menu-item class="run-menu__overflow-menu-item" @click="run">
        Now with defaults
      </p-overflow-menu-item>
      <router-link :to="flowRunCreateRoute(deployment.id)">
        <p-overflow-menu-item class="run-menu__overflow-menu-item">
          Custom
        </p-overflow-menu-item>
      </router-link>
    </p-overflow-menu>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import { PPopOver, PButton, showToast, positions } from '@prefecthq/prefect-design'
  import { ref, h } from 'vue'
  import { useRouter } from 'vue-router'
  import ToastFlowRunCreate from './ToastFlowRunCreate.vue'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { flowRunRouteKey, flowRunCreateRouteKey } from '@/router'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { inject } from '@/utilities'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const popOver = ref<typeof PPopOver>()
  const runButton = ref<typeof PButton>()

  const deploymentsApi = inject(deploymentsApiKey)
  const loading = ref(false)

  const router = useRouter()
  const flowRunRoute = inject(flowRunRouteKey)
  const flowRunCreateRoute = inject(flowRunCreateRouteKey)

  const placement = [positions.bottomRight, positions.bottomLeft, positions.topRight, positions.topLeft]

  function close(): void {
    if (popOver.value) {
      popOver.value.close()
    }
  }

  function esc(): void {
    close()

    if (runButton.value) {
      runButton.value.el.focus()
    }
  }

  const run = async (): Promise<void> => {
    loading.value = true

    try {
      const flowRun = await deploymentsApi.createDeploymentFlowRun(props.deployment.id, {
        state: {
          type: 'scheduled',
          message: 'Run from the Prefect UI with defaults',
        },
      })
      const toastMessage = h(ToastFlowRunCreate, { flowRun, flowRunRoute, router, immediate: true })
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
.run-menu { @apply
  inline-block
}

.run-menu__overflow-menu { @apply
  max-w-xs
  my-2
}

.run-menu__run-icon { @apply
  w-5
  h-5
}
</style>

