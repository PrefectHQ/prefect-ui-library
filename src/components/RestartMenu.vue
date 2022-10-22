<template>
  <p-pop-over ref="popOver" class="restart-menu" auto-close :placement="placement" @keydown.esc="esc">
    <template #target="{ toggle }">
      <p-button
        v-if="canRestart"
        ref="restartButton"
        class="restart-menu__restart-button"
        inset
        :loading="restartingRun"
        @click="toggle"
      >
        Restart
        <p-icon icon="RefreshIcon" />
      </p-button>
    </template>
    <p-overflow-menu class="restart-menu__overflow-menu" @click="close">
      <p-overflow-menu-item class="restart-menu__overflow-menu-item" @click="restartFromFailed">
        Confirm restart
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
  const canRestart = computed(()=> props.flowRun.stateType ? !!props.flowRun.deploymentId && !!terminalStateType.includes(props.flowRun.stateType) && can.update.flow_run : false)
  const restartingRun = ref(false)
  const popOver = ref<typeof PPopOver>()
  const restartButton = ref<typeof PButton>()
  const placement = [positions.bottomRight, positions.bottomLeft, positions.topRight, positions.topLeft]

  function close(): void {
    if (popOver.value) {
      popOver.value.close()
    }
  }

  function esc(): void {
    close()

    if (restartButton.value) {
      restartButton.value.el.focus()
    }
  }


  const restartFromFailed = async (): Promise<void>=> {
    restartingRun.value = true
    try {
      await api.flowRuns.setFlowRunState(props.flowRun.id, { state: { type: 'SCHEDULED', message: 'Restarted from the UI' } })
      showToast(localization.success.restartRun, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.restartRun, 'error')
    } finally {
      restartingRun.value = false
      close()
    }

  }
</script>


<style>
.restart-menu { @apply
  inline-block
}

.restart-menu__overflow-menu { @apply
  max-w-xs
  my-2
}
</style>