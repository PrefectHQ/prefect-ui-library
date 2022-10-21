<template>
  <p-button v-if="canRestart" :loading="restartingRun" inset @click="open">
    Restart <p-icon icon="RefreshIcon" />
  </p-button>
  <p-modal v-model:showModal="showModal" :title="restartModalTitle">
    <p-button @click="restartFromFailed">
      Restart
    </p-button>
  </p-modal>
</template>

<script lang="ts" setup>
  import {  showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { localization } from '@/localization'
  import { FlowRun, terminalStateType } from '@/models'
  import {  inject, workspaceApiKey } from '@/utilities'

  const { showModal, open } = useShowModal()
  const props = defineProps<{
    flowRun: FlowRun,
  }>()
  const can = useCan()
  const api = inject(workspaceApiKey)
  const restartModalTitle = computed(()=> `Restart ${props.flowRun.name}?`)
  const canRestart = computed(()=> props.flowRun.stateType ? !!props.flowRun.deploymentId && !!terminalStateType.includes(props.flowRun.stateType) && can.update.flow_run : false)
  const restartingRun = ref(false)

  const restartFromFailed = async (): Promise<void>=> {
    restartingRun.value = true
    try {
      await api.flowRuns.setFlowRunState(props.flowRun.id, { state: { type: 'SCHEDULED', name: 'Restarting', message: 'Restarted from the UI' } })
      showToast(localization.success.restartRun, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.restartRun, 'error')
    } finally {
      restartingRun.value = false
    }

  }
</script>