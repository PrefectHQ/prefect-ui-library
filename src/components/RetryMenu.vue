<template>
  <p-pop-over ref="popOver" class="retry-menu" auto-close :placement="placement" @keydown.esc="esc">
    <template #target="{ toggle }">
      <p-button
        v-if="canretry"
        ref="retryButton"
        class="retry-menu__retry-button"
        inset
        :loading="retryingRun"
        @click="toggle"
      >
        Retry
        <p-icon icon="RefreshIcon" />
      </p-button>
    </template>
    <p-overflow-menu class="retry-menu__overflow-menu" @click="close">
      <p-overflow-menu-item class="retry-menu__overflow-menu-item" @click="retryFromFailed">
        Confirm retry
      </p-overflow-menu-item>
    </p-overflow-menu>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import {  showToast, PPopOver, PButton, positions } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'
  import { FlowRun, terminalStateType } from '@/models'
  import {  inject, workspaceApiKey } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()
  const can = useCan()
  const api = inject(workspaceApiKey)
  const canretry = computed(()=> props.flowRun.stateType ? !!props.flowRun.deploymentId && !!terminalStateType.includes(props.flowRun.stateType) && can.update.flow_run : false)
  const retryingRun = ref(false)
  const popOver = ref<typeof PPopOver>()
  const retryButton = ref<typeof PButton>()
  const placement = [positions.bottomRight, positions.bottomLeft, positions.topRight, positions.topLeft]

  function close(): void {
    if (popOver.value) {
      popOver.value.close()
    }
  }

  function esc(): void {
    close()

    if (retryButton.value) {
      retryButton.value.el.focus()
    }
  }


  const retryFromFailed = async (): Promise<void>=> {
    retryingRun.value = true
    try {
      await api.flowRuns.setFlowRunState(props.flowRun.id, { state: { type: 'SCHEDULED', name: 'AwaitingRetry', message: 'retryed from the UI' } })
      showToast(localization.success.retryRun, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.retryRun, 'error')
    } finally {
      retryingRun.value = false
      close()
    }

  }
</script>


<style>
.retry-menu { @apply
  inline-block
}

.retry-menu__overflow-menu { @apply
  max-w-xs
  my-2
}
</style>