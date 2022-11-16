<template>
  <page-heading class="page-heading-flow-run" :crumbs="crumbs">
    <template #after-crumbs>
      <StateBadge :state="flowRun.state" />
    </template>
    <template #actions>
      <FlowRunRetryButton :flow-run="flowRun" class="page-heading-flow-run__retry-button" />
      <p-icon-button-menu>
        <template #default>
          <template v-if="canRetry">
            <p-overflow-menu-item label="Retry" class="page-heading-flow-run__retry-menu-item" @click="openRetryModal" />
          </template>
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
      <FlowRunRetryModal
        v-model:showModal="showRetryModal"
        v-model:retryingRun="retryingRun"
        :flow-run="flowRun"
      />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { StateBadge, PageHeading, CopyOverflowMenuItem, ConfirmDeleteModal, FlowRunRetryButton, FlowRunRetryModal } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun, isTerminalStateType } from '@/models'
  import { flowRunsRouteKey } from '@/router'
  import { deleteItem, inject } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const can = useCan()

  const canRetry = computed(()=> {
    if (!can.update.flow_run || !props.flowRun.stateType || !props.flowRun.deploymentId || !can.access.retry) {
      return false
    }
    return isTerminalStateType(props.flowRun.stateType)
  })

  const api = useWorkspaceApi()
  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()
  const { showModal: showRetryModal, open: openRetryModal } = useShowModal()
  const flowRunsRoute = inject(flowRunsRouteKey)
  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [
    { text: 'Flow Runs', to: flowRunsRoute() },
    { text: props.flowRun.name ?? '' },
  ])

  const emit = defineEmits(['delete'])

  const deleteFlowRun = async (id: string): Promise<void> => {
    await deleteItem(id, api.flowRuns.deleteFlowRun, 'Flow run')
    emit('delete', id)
  }

  const retryingRun = ref(false)
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