<template>
  <p-icon-button-menu>
    <template #default>
      <p-overflow-menu-item v-if="canRetry && showAll" label="Retry" @click="openRetryModal" />
      <p-overflow-menu-item v-if="canResume && showAll" label="Resume" @click="openResumeModal" />
      <p-overflow-menu-item v-if="canPause && showAll" label="Pause" @click="openPauseModal" />
      <p-overflow-menu-item v-if="canCancel && showAll" label="Cancel" @click="openCancelModal" />
      <p-overflow-menu-item v-if="canChangeState" label="Change state" @click="openChangeStateModal" />
      <copy-overflow-menu-item label="Copy ID" :item="flowRunId" />
      <p-overflow-menu-item v-if="can.delete.flow_run" label="Delete" @click="openDeleteModal" />
    </template>
  </p-icon-button-menu>

  <FlowRunRetryModal
    v-if="flowRun"
    v-model:showModal="showRetryModal"
    v-model:retryingRun="retryingRun"
    :flow-run="flowRun"
  />
  <FlowRunResumeModal
    v-model:showModal="showResumeModal"
    :flow-run-id="flowRunId"
    @change="showResumeModal"
  />
  <FlowRunCancelModal
    v-model:showModal="showCancelModal"
    :flow-run-id="flowRunId"
    @change="showCancelModal"
  />
  <FlowRunPauseModal
    v-model:showModal="showPauseModal"
    :flow-run-id="flowRunId"
    @change="showPauseModal"
  />
  <ConfirmStateChangeModal
    v-if="flowRun"
    v-model:showModal="showStateChangeModal"
    :run="flowRun"
    label="Flow Run"
    @change="changeFlowRunState"
  />
  <ConfirmDeleteModal
    v-if="flowRun"
    v-model:showModal="showDeleteModal"
    label="Flow Run"
    :name="flowRun.name!"
    @delete="deleteFlowRun(flowRunId)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { FlowRunRetryModal, FlowRunResumeModal, FlowRunCancelModal, FlowRunPauseModal, ConfirmStateChangeModal, ConfirmDeleteModal, CopyOverflowMenuItem } from '@/components'
  import { useCan, useWorkspaceApi, useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { isPausedStateType, isRunningStateType, isStuckStateType, isTerminalStateType, StateUpdateDetails } from '@/models'
  import { deleteItem } from '@/utilities'

  const props = defineProps<{
    flowRunId: string,
    showAll?: boolean,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()

  const { showModal: showRetryModal, open: openRetryModal } = useShowModal()
  const { showModal: showResumeModal, open: openResumeModal } = useShowModal()
  const { showModal: showCancelModal, open: openCancelModal } = useShowModal()
  const { showModal: showPauseModal, open: openPauseModal } = useShowModal()
  const { showModal: showStateChangeModal, open: openChangeStateModal } = useShowModal()
  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()

  const retryingRun = ref(false)

  const flowRunSubscription =  useSubscription(api.flowRuns.getFlowRun, [props.flowRunId], { interval: 30000 })
  const flowRun = computed(() => flowRunSubscription.response)

  const canRetry = computed(() => {
    if (!can.update.flow_run || !flowRun.value?.stateType || !flowRun.value.deploymentId) {
      return false
    }
    return isTerminalStateType(flowRun.value.stateType)
  })

  const canResume = computed(()=> {
    if (!can.update.flow_run || !flowRun.value?.stateType) {
      return false
    }

    return isPausedStateType(flowRun.value.stateType)
  })

  const flowRunFilter = computed<Parameters<typeof api.flowRuns.getFlowRuns> | null>(() => {
    if (flowRun.value?.parentTaskRunId) {
      return [
        {
          task_runs: {
            id: {
              any_: [flowRun.value.parentTaskRunId],
            },
          },
        },
      ]
    }
    return null
  })
  const parentFlowRunListSubscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRuns, flowRunFilter)
  const parentFlowRunList = computed(() => parentFlowRunListSubscription.response ?? [])
  const parentFlowRunId = computed(() => {
    if (!parentFlowRunList.value.length) {
      return
    }
    const [value] = parentFlowRunList.value
    return value.id
  })
  const canCancel = computed(()=> {
    if (!can.update.flow_run || !flowRun.value?.stateType || parentFlowRunId.value) {
      return false
    }
    return isStuckStateType(flowRun.value.stateType)
  })

  const canPause = computed(()=> {
    if (!can.update.flow_run || !flowRun.value?.stateType || !flowRun.value.deploymentId) {
      return false
    }

    return isRunningStateType(flowRun.value.stateType)
  })

  const canChangeState = computed(() => {
    if (!can.update.flow_run || !flowRun.value?.stateType) {
      return false
    }
    return isTerminalStateType(flowRun.value.stateType)
  })

  const changeFlowRunState = async (values: StateUpdateDetails): Promise<void> => {
    try {
      await api.flowRuns.setFlowRunState(props.flowRunId, { state: values })
      flowRunSubscription.refresh()
      showToast(localization.success.changeFlowRunState, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.changeFlowRunState, 'error')
    }
  }

  const emit = defineEmits(['delete'])

  const deleteFlowRun = async (id: string): Promise<void> => {
    await deleteItem(id, api.flowRuns.deleteFlowRun, 'Flow run')
    emit('delete', id)
  }
</script>