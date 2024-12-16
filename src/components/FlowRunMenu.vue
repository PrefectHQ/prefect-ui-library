<template>
  <p-icon-button-menu class="flow-run-menu" v-bind="$attrs">
    <template #default>
      <p-overflow-menu-item v-if="flowRun?.deploymentId && deployment?.can.run" label="Copy to new run" :to="routes.deploymentFlowRunCreate(flowRun.deploymentId, flowRun.parameters)" />
      <p-overflow-menu-item v-if="canRetry && showAll" label="Retry" @click="openRetryModal" />
      <p-overflow-menu-item v-if="canResume && showAll" label="Resume" @click="openResumeModal" />
      <p-overflow-menu-item v-if="canSuspend && showAll" label="Pause" @click="openSuspendModal" />
      <p-overflow-menu-item v-if="canCancel && showAll" label="Cancel" @click="openCancelModal" />
      <p-overflow-menu-item v-if="canChangeState" label="Change state" @click="openChangeStateModal" />
      <copy-overflow-menu-item label="Copy ID" :item="flowRun.id" />
      <p-overflow-menu-item v-if="can.delete.flow_run" label="Delete" @click="openDeleteModal" />

      <slot v-bind="{ flowRun }" />
    </template>
  </p-icon-button-menu>

  <FlowRunRetryModal
    v-model:showModal="showRetryModal"
    v-model:retryingRun="retryingRun"
    :flow-run="flowRun"
  />

  <FlowRunResumeModal
    v-model:showModal="showResumeModal"
    :flow-run="flowRun"
    @update="emit('update')"
  />

  <FlowRunCancelModal
    v-model:showModal="showCancelModal"
    :flow-run="flowRun"
    @update="emit('update')"
  />

  <FlowRunSuspendModal
    v-model:showModal="showSuspendModal"
    :flow-run="flowRun"
    @update="emit('update')"
  />

  <ConfirmStateChangeModal
    v-model:showModal="showStateChangeModal"
    :run="flowRun"
    label="Flow Run"
    @change="changeFlowRunState"
  />

  <ConfirmDeleteModal
    v-model:showModal="showDeleteModal"
    label="Flow Run"
    :name="flowRun.name!"
    @delete="deleteFlowRun(flowRun.id)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { FlowRunRetryModal, FlowRunCancelModal, FlowRunSuspendModal, ConfirmStateChangeModal, ConfirmDeleteModal, CopyOverflowMenuItem } from '@/components'
  import FlowRunResumeModal from '@/components/FlowRunResumeModal.vue'
  import { useCan, useWorkspaceApi, useShowModal, useWorkspaceRoutes, useFlowRuns, useDeployment } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowRun, isPausedStateType, isRunningStateType, isStuckStateType, isTerminalStateType, StateUpdateDetails } from '@/models'
  import { deleteItem } from '@/utilities'
  import { getApiErrorMessage } from '@/utilities/errors'

  defineOptions({
    inheritAttrs: false,
  })

  const { flowRun } = defineProps<{
    flowRun: FlowRun,
    showAll?: boolean,
  }>()

  const emit = defineEmits(['delete', 'update'])

  const can = useCan()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const { showModal: showRetryModal, open: openRetryModal } = useShowModal()
  const { showModal: showResumeModal, open: openResumeModal } = useShowModal()
  const { showModal: showCancelModal, open: openCancelModal } = useShowModal()
  const { showModal: showSuspendModal, open: openSuspendModal } = useShowModal()
  const { showModal: showStateChangeModal, open: openChangeStateModal } = useShowModal()
  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()

  const retryingRun = ref(false)

  const { deployment } = useDeployment(() => flowRun.deploymentId)

  const canRetry = computed(() => {
    if (!can.update.flow_run || !flowRun.stateType || !flowRun.deploymentId) {
      return false
    }
    return isTerminalStateType(flowRun.stateType)
  })

  const canResume = computed(() => {
    if (!can.update.flow_run || !flowRun.stateType) {
      return false
    }

    return isPausedStateType(flowRun.stateType)
  })

  const { flowRuns: parentFlowRunList } = useFlowRuns(() => {
    if (!flowRun.parentTaskRunId) {
      return null
    }

    return {
      taskRuns: {
        id: [flowRun.parentTaskRunId],
      },
    }
  })

  const parentFlowRunId = computed(() => {
    if (!parentFlowRunList.value.length) {
      return
    }
    const [value] = parentFlowRunList.value
    return value.id
  })

  const canCancel = computed(() => {
    if (!can.update.flow_run || !flowRun.stateType || parentFlowRunId.value) {
      return false
    }
    return isStuckStateType(flowRun.stateType)
  })

  const canSuspend = computed(() => {
    if (!can.update.flow_run || !flowRun.stateType || !flowRun.deploymentId) {
      return false
    }

    return isRunningStateType(flowRun.stateType)
  })

  const canChangeState = computed(() => {
    if (!can.update.flow_run || !flowRun.stateType) {
      return false
    }
    return isTerminalStateType(flowRun.stateType)
  })

  const changeFlowRunState = async (values: StateUpdateDetails): Promise<void> => {
    try {
      await api.flowRuns.setFlowRunState(flowRun.id, { state: values })
      emit('update')
      showToast(localization.success.changeFlowRunState, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.changeFlowRunState)
      showToast(message, 'error')
    }
  }

  const deleteFlowRun = async (id: string): Promise<void> => {
    await deleteItem(id, api.flowRuns.deleteFlowRun, 'Flow run')
    emit('delete', id)
  }
</script>
