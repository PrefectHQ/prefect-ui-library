<template>
  <page-heading class="page-heading-flow-run" :crumbs="crumbs">
    <template #after-crumbs>
      <StateBadge :state="flowRun.state" />
    </template>
    <template #actions>
      <FlowRunRetryButton :flow-run="flowRun" />
      <p-icon-button-menu>
        <template #default>
          <p-overflow-menu-item v-if="showChangeStateMenuItemButton" label="Change state" @click="openChangeStateModal" />
          <copy-overflow-menu-item label="Copy ID" :item="flowRun.id" />
          <p-overflow-menu-item v-if="can.delete.flow_run" label="Delete" @click="openDeleteModal" />
        </template>
      </p-icon-button-menu>
      <ConfirmDeleteModal
        v-model:showModal="showDeleteModal"
        label="Flow Run"
        :name="flowRun.name!"
        @delete="deleteFlowRun(flowRun.id)"
      />

      <ConfirmStateChangeModal
        v-model:showModal="showStateChangeModal"
        :run="flowRun"
        label="Flow Run"
        @change="changeFlowRunState"
      />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu, showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { StateBadge, PageHeading, CopyOverflowMenuItem, ConfirmDeleteModal, FlowRunRetryButton, ConfirmStateChangeModal } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'
  import { FlowRun, StateUpdateDetails, terminalStateType } from '@/models'
  import { flowRunsRouteKey } from '@/router'
  import { deleteItem, inject } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const flowRunsRoute = inject(flowRunsRouteKey)
  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [
    { text: 'Flow Runs', to: flowRunsRoute() },
    { text: props.flowRun.name ?? '' },
  ])

  const showChangeStateMenuItemButton = computed(() => {
    if (can.update.flow_run && props.flowRun.stateType && terminalStateType.includes(props.flowRun.stateType)) {
      return true
    }

    return false
  })

  const showStateChangeModal = ref(false)
  const openChangeStateModal = (): void => {
    showStateChangeModal.value = true
  }

  const showDeleteModal = ref(false)
  const openDeleteModal = (): void => {
    showDeleteModal.value = true
  }

  const emit = defineEmits(['delete'])

  const deleteFlowRun = async (id: string): Promise<void> => {
    await deleteItem(id, api.flowRuns.deleteFlowRun, 'Flow run')
    emit('delete', id)
  }

  const changeFlowRunState = async (values: StateUpdateDetails): Promise<void> => {
    try {
      await api.flowRuns.setFlowRunState(props.flowRun.id, { state: values })
      showToast(localization.success.changeFlowRunState, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.changeFlowRunState, 'error')
    }
  }
</script>
