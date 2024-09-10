<template>
  <p-icon-button-menu>
    <template #default>
      <p-overflow-menu-item v-if="flowRun?.deploymentId && deployment?.can.run" label="Copy to new run" :to="routes.deploymentFlowRunCreate(flowRun.deploymentId, flowRun.parameters)" />
      <p-overflow-menu-item v-if="canRetry && showAll" label="Retry" @click="openRetryModal" />
      <p-overflow-menu-item v-if="canResume && showAll" label="Resume" @click="openResumeModal" />
      <p-overflow-menu-item v-if="canSuspend && showAll" label="Pause" @click="openSuspendModal" />
      <p-overflow-menu-item v-if="canCancel && showAll" label="Cancel" @click="openCancelModal" />
      <p-overflow-menu-item v-if="canChangeState" label="Change state" @click="openChangeStateModal" />
      <copy-overflow-menu-item label="Copy ID" :item="flowRunId" />
      <p-overflow-menu-item v-if="can.delete.flow_run" label="Delete" @click="openDeleteModal" />

      <slot v-bind="{ flowRun }" />
    </template>
  </p-icon-button-menu>

  <FlowRunRetryModal
    v-if="flowRun"
    v-model:showModal="showRetryModal"
    v-model:retryingRun="retryingRun"
    :flow-run="flowRun"
  />

  <FlowRunResumeModal v-model:showModal="showResumeModal" :flow-run-id="flowRunId" />

  <FlowRunCancelModal
    v-model:showModal="showCancelModal"
    :flow-run-id="flowRunId"
    @change="showCancelModal"
  />
  <FlowRunSuspendModal
    v-model:showModal="showSuspendModal"
    :flow-run-id="flowRunId"
    @change="showSuspendModal"
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
  import { computed, ref, toRefs } from 'vue'
  import { FlowRunRetryModal, FlowRunCancelModal, FlowRunSuspendModal, ConfirmStateChangeModal, ConfirmDeleteModal, CopyOverflowMenuItem } from '@/components'
  import FlowRunResumeModal from '@/components/FlowRunResumeModal.vue'
  import { useCan, useWorkspaceApi, useShowModal, useWorkspaceRoutes, useFlowRuns, useDeployment } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowRun, FlowRunsFilter, isPausedStateType, isRunningStateType, isStuckStateType, isTerminalStateType, StateUpdateDetails } from '@/models'
  import { deleteItem } from '@/utilities'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    flowRunId: string,
    flowRun: FlowRun,
    showAll?: boolean,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const { flowRunId } = toRefs(props)

  const { showModal: showRetryModal, open: openRetryModal } = useShowModal()
  const { showModal: showResumeModal, open: openResumeModal } = useShowModal()
  const { showModal: showCancelModal, open: openCancelModal } = useShowModal()
  const { showModal: showSuspendModal, open: openSuspendModal } = useShowModal()
  const { showModal: showStateChangeModal, open: openChangeStateModal } = useShowModal()
  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()

  const retryingRun = ref(false)

  const { deployment } = useDeployment(() => props.flowRun.deploymentId)

  const canRetry = computed(() => {
    if (!can.update.flow_run || !props.flowRun.stateType || !props.flowRun.deploymentId) {
      return false
    }
    return isTerminalStateType(props.flowRun.stateType)
  })

  const canResume = computed(() => {
    if (!can.update.flow_run || !props.flowRun.stateType) {
      return false
    }

    return isPausedStateType(props.flowRun.stateType)
  })

  const flowRunFilter = (): FlowRunsFilter | null => {
    if (!props.flowRun.parentTaskRunId) {
      return null
    }

    return {
      taskRuns: {
        id: [props.flowRun.parentTaskRunId],
      },
    }
  }
  const { flowRuns: parentFlowRunList } = useFlowRuns(flowRunFilter)
  const parentFlowRunId = computed(() => {
    if (!parentFlowRunList.value.length) {
      return
    }
    const [value] = parentFlowRunList.value
    return value.id
  })
  const canCancel = computed(() => {
    if (!can.update.flow_run || !props.flowRun.stateType || parentFlowRunId.value) {
      return false
    }
    return isStuckStateType(props.flowRun.stateType)
  })

  const canSuspend = computed(() => {
    if (!can.update.flow_run || !props.flowRun.stateType || !props.flowRun.deploymentId) {
      return false
    }

    return isRunningStateType(props.flowRun.stateType)
  })

  const canChangeState = computed(() => {
    if (!can.update.flow_run || !props.flowRun.stateType) {
      return false
    }
    return isTerminalStateType(props.flowRun.stateType)
  })

  const changeFlowRunState = async (values: StateUpdateDetails): Promise<void> => {
    try {
      await api.flowRuns.setFlowRunState(props.flowRunId, { state: values })
      emit('update')
      showToast(localization.success.changeFlowRunState, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.changeFlowRunState)
      showToast(message, 'error')
    }
  }

  const emit = defineEmits(['delete', 'update'])

  const deleteFlowRun = async (id: string): Promise<void> => {
    await deleteItem(id, api.flowRuns.deleteFlowRun, 'Flow run')
    emit('delete', id)
  }
</script>
