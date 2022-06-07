<template>
  <page-heading class="page-heading-flow-run" :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <template #default>
          <copy-overflow-menu-item label="Copy ID" :item="flowRun.id" />
          <p-overflow-menu-item label="Set State" />
          <p-overflow-menu-item label="Delete" @click="open" />
        </template>
      </p-icon-button-menu>
      <ConfirmDeleteModal
        v-model:showModal="showModal"
        :name="flowRun.name!"
        @delete="deleteFlowRun(flowRun.id)"
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
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { StateBadge, PageHeading, DurationIconText, FlowIconText, CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun } from '@/models'
  import { flowsRouteKey } from '@/router'
  import { flowRunsApiKey, flowsApiKey } from '@/services'
  import { deleteItem, inject } from '@/utilities'

  const flowsRoute = inject(flowsRouteKey)
  const flowsApi = inject(flowsApiKey)
  const flowRunsApi = inject(flowRunsApiKey)

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const { showModal, open } = useShowModal()

  const flowRunId = computed(() => props.flowRun.flowId)
  const flowSubscription = useSubscription(flowsApi.getFlow, [flowRunId])
  const flowName = computed(() => flowSubscription.response?.name ?? '')

  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [{ text: flowName.value, to: flowsRoute() }, { text: props.flowRun.name ?? '' }])

  const emit = defineEmits(['delete'])

  const deleteFlowRun = async (id: string): Promise<void> => {
    await deleteItem(id, flowRunsApi.deleteFlowRun, 'Flow run')
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