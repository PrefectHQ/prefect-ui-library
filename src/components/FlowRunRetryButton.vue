<template>
  <p-button
    v-if="canRetry"
    inset
    :loading="retryingRun"
    @click="open"
  >
    Retry
    <p-icon icon="RefreshIcon" />
  </p-button>

  <p-modal v-model:showModal="showModal" :title="retryModalTitle">
    {{ retryModalMessage }}
    <template #actions>
      <p-button @click="retryFromFailed">
        Retry
      </p-button>
    </template>
  </p-modal>
</template>

  <script lang="ts" setup>
  import {  showToast, PButton } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { localization } from '@/localization'
  import { FlowRun, terminalStateType } from '@/models'

  const { showModal, open, close } = useShowModal()
  const retryModalTitle = computed(()=> `Retry ${props.flowRun.name}?`)
  const retryModalMessage = computed(()=> `This will retry flow run ${props.flowRun.name}. Any task runs in a failed, cancelled or crashed state will be run again.`)
  const props = defineProps<{
    flowRun: FlowRun,
  }>()
  const can = useCan()
  const api = useWorkspaceApi()
  const canRetry = computed(()=> {
    if (!can.update.flow_run || !props.flowRun.stateType || !props.flowRun.deploymentId) {
      return false
    }
    return terminalStateType.includes(props.flowRun.stateType)
  })
  const retryingRun = ref(false)

  const retryFromFailed = async (): Promise<void>=> {
    retryingRun.value = true
    try {
      await api.flowRuns.retryFlowRun(props.flowRun.id)
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
