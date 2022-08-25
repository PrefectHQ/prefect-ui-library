<template>
  <page-heading class="page-heading-flow-run" :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <template #default>
          <copy-overflow-menu-item label="Copy ID" :item="flowRun.id" />
          <p-overflow-menu-item v-if="can.delete.flow_run" label="Delete" @click="open" />
        </template>
      </p-icon-button-menu>
      <ConfirmDeleteModal
        v-model:showModal="showModal"
        label="Flow Run"
        :name="flowRun.name!"
        @delete="remove(flowRun.id)"
      />
    </template>
    <slot>
      <div class="page-heading-flow-run__header-meta">
        <StateBadge :state="flowRun.state" />
        <DurationIconText :duration="flowRun.duration" />
        <FlowIconText :flow-id="flowRun.flowId" />
      </div>
    </slot>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { StateBadge, PageHeading, DurationIconText, FlowIconText, CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun } from '@/models'
  import { flowRunsRouteKey } from '@/router'
  import * as flowRunsApi from '@/services/FlowRunsApi'
  import { canKey } from '@/types'
  import { deleteItem, inject } from '@/utilities'

  const deleteFlowRun = inject(flowRunsApi.deleteFlowRunKey, flowRunsApi.deleteFlowRun)
  const can = inject(canKey)

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const { showModal, open } = useShowModal()

  const flowRunsRoute = inject(flowRunsRouteKey)
  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [
    { text: 'Flow Runs', to: flowRunsRoute() },
    { text: props.flowRun.name ?? '' },
  ])

  const emit = defineEmits(['delete'])

  const remove = async (id: string): Promise<void> => {
    await deleteItem(id, deleteFlowRun, 'Flow run')
    emit('delete', id)
  }
</script>

<style>
.page-heading-flow-run__header-meta {
  @apply
  flex
  gap-2
  items-center
  xl:hidden
}
</style>
