<template>
  <p-pop-over ref="popOver" class="run-menu" auto-close>
    <template #target="{ toggle }">
      <p-button
        ref="button"
        class="run-menu__button"
        inset
        :loading="loading"
        :disabled="deployment.deprecated"
        @click="toggle"
      >
        Run
        <p-icon class="run-button__run-icon" icon="PlayIcon" solid />
      </p-button>
    </template>
    <p-overflow-menu class="run-menu__overflow-menu" @keydown.esc="esc" @click="close">
      <p-overflow-menu-item class="run-menu__overflow-menu-item">
        With defaults
      </p-overflow-menu-item>
      <p-overflow-menu-item class="run-menu__overflow-menu-item">
        Schedule a run
      </p-overflow-menu-item>
      <router-link :to="flowRunCreateRoute(deployment.id)">
        <p-overflow-menu-item class="run-menu__overflow-menu-item">
          Custom (Advanced)
        </p-overflow-menu-item>
      </router-link>
    </p-overflow-menu>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import { PPopOver, PButton, showToast } from '@prefecthq/prefect-design'
  import { ref, h } from 'vue'
  import { useRouter } from 'vue-router'
  import ToastFlowRunCreate from './ToastFlowRunCreate.vue'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { flowRunRouteKey, flowRunCreateRouteKey } from '@/router'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { inject } from '@/utilities'

  defineProps<{
    deployment: Deployment,
  }>()

  const popOver = ref<typeof PPopOver>()
  const button = ref<typeof PButton>()

  const deploymentsApi = inject(deploymentsApiKey)
  const loading = ref(false)
  const flowRun = ref()

  const router = useRouter()
  const flowRunRoute = inject(flowRunRouteKey)
  const flowRunCreateRoute = inject(flowRunCreateRouteKey)

  function close(): void {
    if (popOver.value) {
      popOver.value.close()
    }
  }

  function esc(): void {
    if (popOver.value) {
      popOver.value.close()
    }
    if (button.value) {
      button.value.el.focus()
    }
  }

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

