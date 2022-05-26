<template>
  <page-heading class="page-heading-flow-run" :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <template #default="{ close }">
          <copy-overflow-menu-item label="Copy ID" :item="flowRun.id" @click="close" />
          <p-overflow-menu-item label="Set State" />
          <delete-overflow-menu-item :name="flowRun.name!" @delete="deleteFlowRun(flowRun.id)" />
        </template>
      </p-icon-button-menu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import DeleteOverflowMenuItem from './DeleteOverflowMenuItem.vue'
  import PageHeading from '@/components/PageHeading.vue'
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

  const flowSubscription = useSubscription(flowsApi.getFlow, [props.flowRun.flowId])
  const flowName = computed(() => flowSubscription.response?.name ?? '')

  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [{ text: flowName.value, to: flowsRoute() }, { text: props.flowRun.name ?? '' }])

  const emit = defineEmits(['delete'])

  const deleteFlowRun = (id: string): void => {
    deleteItem(id, flowRunsApi.deleteFlowRun, 'Flow run')
    emit('delete', id)
  }
</script>