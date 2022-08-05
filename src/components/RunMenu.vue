<template>
  <p-pop-over ref="popOver" class="run-menu" auto-close :placement="placement">
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
    <p-overflow-menu class="run-menu__overflow-menu" @keydown.esc="esc" @click="close">
      <p-overflow-menu-item class="run-menu__overflow-menu-item">
        <h6 class="run-menu__overflow-menu-item__heading">
          Now
        </h6>
        <div class="run-menu__overflow-menu-item__content">
          Create a run with defaults
        </div>
      </p-overflow-menu-item>
      <p-overflow-menu-item class="run-menu__overflow-menu-item">
        <h6 class="run-menu__overflow-menu-item__heading">
          Later
        </h6>
        <div class="run-menu__overflow-menu-item__content">
          Schedule a run with defaults
        </div>
      </p-overflow-menu-item>
      <router-link :to="flowRunCreateRoute(deployment.id)">
        <p-overflow-menu-item class="run-menu__overflow-menu-item">
          <h6 class="run-menu__overflow-menu-item__heading">
            Custom
          </h6>
          <div class="run-menu__overflow-menu-item__content">
            Create a run with customized start, parameters, tags, and more
          </div>
        </p-overflow-menu-item>
      </router-link>
    </p-overflow-menu>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import { PPopOver, PButton, showToast, PositionMethod, positions } from '@prefecthq/prefect-design'
  import { ref, h, computed } from 'vue'
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
  const runButton = ref<typeof PButton>()

  const deploymentsApi = inject(deploymentsApiKey)
  const loading = ref(false)
  const flowRun = ref()

  const router = useRouter()
  const flowRunRoute = inject(flowRunRouteKey)
  const flowRunCreateRoute = inject(flowRunCreateRouteKey)

  const placement = computed <PositionMethod[]>(() => {
    return [positions.bottomRight, positions.bottomLeft, positions.topRight, positions.topLeft]
  })

  function close(): void {
    if (popOver.value) {
      popOver.value.close()
    }
  }

  function esc(): void {
    if (popOver.value) {
      popOver.value.close()
    }
    if (runButton.value) {
      runButton.value.el.focus()
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

.run-menu__overflow-menu-item { @apply
  flex
  flex-col
  items-start
  text-left
}

.run-menu__overflow-menu-item__heading { @apply
 text-base
}

.run-menu__overflow-menu-item__content { @apply
 text-slate-500
}
</style>

