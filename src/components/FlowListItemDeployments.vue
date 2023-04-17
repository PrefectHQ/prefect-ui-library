<template>
  <div class="flow-list-item-deployments">
    <template v-if="showHeader">
      <div class="flow-list-item-deployments__header">
        <DeploymentsDeleteButton v-if="can.delete.deployment" :selected="selected" @delete="deleteDeployments" />
        <SelectedCount v-if="selected.length" :count="selected.length" />
      </div>
    </template>

    <p-virtual-scroller
      :items="deployments"
      :item-estimate-height="60"
      :chunk-size="20"
      item-key="id"
      @bottom="fetchMore"
    >
      <template #default="{ item: deployment }">
        <DeploymentListItem v-model:selected="selected" v-bind="{ deployment }" class="flow-list-item-deployments__deployment" @update="handleUpdate" @delete="handleDelete" />
      </template>
    </p-virtual-scroller>

    <template v-if="deploymentsSubscription.executed">
      <template v-if="!deployments.length">
        <div class="flow-list-item-deployments__empty-state-container">
          <FlowListItemDeploymentsEmptyState :flow="flow" />
        </div>
      </template>
    </template>

    <template v-else>
      <p-loading-icon class="flow-list-item-deployments__loading-icon" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import {
    DeploymentsDeleteButton,
    DeploymentListItem,
    FlowListItemDeploymentsEmptyState,
    SelectedCount
  } from '@/components'
  import { useCan, useDeploymentsFilterFromRoute, useWorkspaceApi } from '@/compositions'
  import { DeploymentsFilter, Flow } from '@/models'

  const props = defineProps<{
    flow: Flow,
    filter?: DeploymentsFilter,
  }>()

  const emit = defineEmits<{
    (event: 'update' | 'delete', value?: string): void,
  }>()

  const DEPLOYMENTS_DEFAULT_FILTER_LIMIT = 10

  const can = useCan()
  const api = useWorkspaceApi()

  const { filter: routeFilter } = useDeploymentsFilterFromRoute()

  const filter = computed<DeploymentsFilter>(() => {
    return {
      ...props.filter,
      flows: {
        ...props.filter?.flows,
        id: [props.flow.id],
      },
      deployments: {
        ...props.filter?.deployments,
        ...routeFilter.deployments,
      },
      limit: DEPLOYMENTS_DEFAULT_FILTER_LIMIT,
    }
  })

  const deploymentsSubscriptionArgs = computed<[DeploymentsFilter]>(() => [filter.value])

  const deploymentsSubscription = useSubscriptionWithDependencies(
    api.deployments.getDeployments,
    deploymentsSubscriptionArgs,
  )

  const deployments = computed(() => deploymentsSubscription.response ?? [])

  const fetchMore = (): void => {
    // TODO: implement
  }

  const deleteDeployments = (): void => emit('delete')

  const handleDelete = (deploymentId: string): void => {
    emit('delete', deploymentId)
    deploymentsSubscription.refresh()
  }

  const handleUpdate = (deploymentId: string): void => {
    emit('update', deploymentId)
    deploymentsSubscription.refresh()
  }

  const selected = ref([])

  const showHeader = computed(() => {
    return selected.value.length > 0 || can.delete.deployment
  })
</script>

<style>
.flow-list-item-deployments {
  --virtual-scroller-item-gap: theme('spacing.2')
}

.flow-list-item-deployments__deployment { @apply
  rounded-l-sm
}

.flow-list-item-deployments__header { @apply
  flex
  items-center
  p-2
  gap-4
  h-min
}

.flow-list-item-deployments__empty-state-container { @apply
  p-4
}

.flow-list-item-deployments__loading-icon { @apply
  mx-auto
}
</style>