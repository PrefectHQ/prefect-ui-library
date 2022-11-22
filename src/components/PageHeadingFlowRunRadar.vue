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
        @delete="deleteFlowRun(flowRun.id)"
      />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { PageHeading, CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun } from '@/models'
  import { useWorkspaceRoutes } from '@/router'
  import { deleteItem } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const { showModal, open } = useShowModal()

  const crumbs = computed(() => [
    { text: 'Flow Runs', to: routes.flowRuns() },
    { text: props.flowRun.name ?? '', to: routes.flowRun(props.flowRun.id) },
    { text: 'Radar' },
  ])

  const emit = defineEmits(['delete'])

  const deleteFlowRun = async (id: string): Promise<void> => {
    await deleteItem(id, api.flowRuns.deleteFlowRun, 'Flow run')
    emit('delete', id)
  }
</script>

<style>
.page-heading-flow-run-radar { @apply
  backdrop-blur-sm
}
</style>
