<template>
  <page-heading v-if="flowRun" class="page-heading-flow-run" :crumbs="crumbs">
    <template #after-crumbs>
      <StateBadge :state="flowRun.state" />
    </template>
    <template #actions>
      <FlowRunRetryButton :flow-run="flowRun" class="page-heading-flow-run__retry-button" />
      <FlowRunCancelButton :flow-run="flowRun" class="page-heading-flow-run__cancel-button" />
      <p-icon-button-menu>
        <template #default>
          <p-overflow-menu-item v-if="canRetry" label="Retry" class="page-heading-flow-run__retry-menu-item" @click="openRetryModal" />
          <p-overflow-menu-item v-if="showChangeStateMenuItemButton" label="Change state" @click="openChangeStateModal" />
          <copy-overflow-menu-item label="Copy ID" :item="flowRun.id" />
          <p-overflow-menu-item v-if="can.delete.flow_run" label="Delete" @click="openDeleteModal" />
        </template>
      </p-icon-button-menu>
      <FlowRunRetryModal
        v-model:showModal="showRetryModal"
        v-model:retryingRun="retryingRun"
        :flow-run="flowRun"
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
        @delete="deleteFlowRun(flowRunId)"
      />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu, showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import FlowRunCancelButton from './FlowRunCancelButton.vue'
  import { StateBadge, PageHeading, CopyOverflowMenuItem, ConfirmDeleteModal, FlowRunRetryButton, FlowRunRetryModal, ConfirmStateChangeModal } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { localization } from '@/localization'
  import { isTerminalStateType, StateUpdateDetails } from '@/models'
  import { flowRunsRouteKey } from '@/router'
  import { deleteItem, inject } from '@/utilities'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const can = useCan()

  const canRetry = computed(() => {
    if (!can.update.flow_run || !flowRun.value?.stateType || !flowRun.value.deploymentId) {
      return false
    }
    return isTerminalStateType(flowRun.value.stateType)
  })

  const api = useWorkspaceApi()
  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()
  const { showModal: showRetryModal, open: openRetryModal } = useShowModal()
  const { showModal: showStateChangeModal, open: openChangeStateModal } = useShowModal()
  const flowRunsRoute = inject(flowRunsRouteKey)
  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [
    { text: 'Flow Runs', to: flowRunsRoute() },
    { text: flowRun.value?.name ?? '' },
  ])

  const flowRunSubscription =  useSubscription(api.flowRuns.getFlowRun, [props.flowRunId], { interval: 30000 })
  const flowRun = computed(() => flowRunSubscription.response)

  const emit = defineEmits(['delete'])

  const deleteFlowRun = async (id: string): Promise<void> => {
    await deleteItem(id, api.flowRuns.deleteFlowRun, 'Flow run')
    emit('delete', id)
  }

  const retryingRun = ref(false)

  const showChangeStateMenuItemButton = computed(() => {
    if (can.update.flow_run && flowRun.value?.stateType && isTerminalStateType(flowRun.value.stateType)) {
      return true
    }
    return false
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
</script>

<style>
.page-heading-flow-run__retry-button { @apply
  hidden
  sm:block
}

.page-heading-flow-run__retry-menu-item { @apply
  flex
  sm:hidden
}
</style>