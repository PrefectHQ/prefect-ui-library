<template>
  <page-heading class="page-heading-flow-run-radar" :crumbs="crumbs">
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
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { PageHeading, CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun } from '@/models'
  import { flowRunRouteKey, flowRunsRouteKey } from '@/router'
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
  const flowRunRoute = inject(flowRunRouteKey)

  const crumbs = computed(() => [
    { text: 'Flow Runs', to: flowRunsRoute() },
    { text: props.flowRun.name ?? '', to: flowRunRoute(props.flowRun.id) },
    { text: 'Radar' },
  ])

  const emit = defineEmits(['delete'])

  const remove = async (id: string): Promise<void> => {
    await deleteItem(id, deleteFlowRun, 'Flow run')
    emit('delete', id)
  }
</script>

<style>
.page-heading-flow-run-radar { @apply
  backdrop-blur-sm
}
</style>
