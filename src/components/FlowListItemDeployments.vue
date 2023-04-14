<template>
  <div class="flow-list-item-deployments">
    <div class="flow-list-item-deployments__header">
      <DeploymentsDeleteButton v-if="can.delete.deployment" :selected="selected" @delete="deleteDeployments" />
      <SelectedCount v-if="selected.length" :count="selected.length" />
    </div>

    <template v-if="deploymentsSubscription.loading">
      <p-loading-icon />
    </template>

    <template v-else-if="deployments.length">
      <p-virtual-scroller
        :items="deployments"
        :item-estimate-height="60"
        item-key="id"
        @bottom="fetchMore"
      >
        <template #default="{ item: deployment }">
          <DeploymentListItem v-model:selected="selected" v-bind="{ deployment }" class="flow-list-item-deployments__deployment" />
        </template>
      </p-virtual-scroller>
    </template>

    <template v-else>
      <div class="flow-list-item-deployments__empty-state-container">
        <FlowListItemDeploymentsEmptyState :flow="flow" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import {
    DeploymentsDeleteButton,
    DeploymentListItem,
    FlowListItemDeploymentsEmptyState,
    SelectedCount
  } from '@/components'
  import { useCan, useWorkspaceApi } from '@/compositions'
  import { DeploymentsFilter, Flow } from '@/models'

  const props = defineProps<{
    flow: Flow,
    filter?: DeploymentsFilter,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const DEPLOYMENTS_DEFAULT_FILTER_LIMIT = 10

  const can = useCan()
  const api = useWorkspaceApi()
  const deploymentsFilter = computed <[DeploymentsFilter]>(() => [
    {
      ...props.filter,
      sort: 'CREATED_DESC',
      limit: DEPLOYMENTS_DEFAULT_FILTER_LIMIT,
    },
  ])
  const deploymentsSubscription = useSubscription(
    api.deployments.getDeployments,
    deploymentsFilter,
  )
  const deploymentsCountSubscription = useSubscription(
    api.deployments.getDeploymentsCount,
    deploymentsFilter,
  )

  const deploymentsCount = computed(() => deploymentsCountSubscription.response ?? 0)
  const deployments = computed(() => deploymentsSubscription.response ?? [])

  const fetchMore = (): void => {
    // TODO: implement
  }

  const deleteDeployments = (): void => {
    // TODO: implement
  }

  const selected = ref([])
</script>

<style>
.flow-list-item-deployments {
  --virtual-scroller-item-gap: theme('spacing.4')
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
</style>