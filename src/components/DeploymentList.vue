<template>
  <div class="deployment-list">
    <template v-if="showHeader">
      <div class="deployment-list__header">
        <DeploymentsDeleteButton v-if="can.delete.deployment" :selected="selected" @delete="deleteDeployments" />
        <SelectedCount v-if="selected.length" :count="selected.length" />
      </div>
    </template>

    <p-virtual-scroller
      :items="deployments"
      :item-estimate-height="60"
      :chunk-size="20"
      item-key="id"
    >
      <template #default="{ item: deployment }">
        <DeploymentListItem v-model:selected="selected" v-bind="{ deployment }" class="deployment-list__deployment" @update="handleUpdate" @delete="handleDelete" />
      </template>
    </p-virtual-scroller>

    <template v-if="deployments.length && pages > 1">
      <p-pager v-model:page="page" :pages="pages" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import {
    DeploymentsDeleteButton,
    DeploymentListItem,
    SelectedCount
  } from '@/components'
  import { useCan, useDeploymentsFilterFromRoute, useWorkspaceApi } from '@/compositions'
  import { DeploymentsFilter } from '@/models'

  const props = defineProps<{
    filter?: DeploymentsFilter,
  }>()

  const emit = defineEmits<{
    (event: 'update' | 'delete', value?: string): void,
  }>()

  const DEFAULT_LIMIT = 40

  const can = useCan()
  const api = useWorkspaceApi()

  const { filter: routeFilter } = useDeploymentsFilterFromRoute()
  const page = ref(1)
  const offset = computed({
    get: () => (page.value - 1) * DEFAULT_LIMIT,
    set: (value: number) => {
      page.value = Math.ceil(value / DEFAULT_LIMIT) + 1
    },
  })
  const pages = computed(() => Math.ceil((deploymentsCount.value ?? DEFAULT_LIMIT) / DEFAULT_LIMIT))

  const baseFilter = computed(() => {
    return {
      ...props.filter,
    }
  })

  const filter = computed<DeploymentsFilter>(() => {
    return {
      ...baseFilter.value,
      deployments: {
        ...props.filter?.deployments,
        ...routeFilter.deployments,
      },
      offset: offset.value,
      limit: DEFAULT_LIMIT,
    }
  })

  const deploymentsSubscriptionArgs = computed<[DeploymentsFilter]>(() => [filter.value])

  const deploymentsSubscription = useSubscriptionWithDependencies(
    api.deployments.getDeployments,
    deploymentsSubscriptionArgs,
  )

  const deployments = computed(() => deploymentsSubscription.response ?? [])

  const deploymentsCountSubscriptionArgs = computed<[DeploymentsFilter]>(() => [baseFilter.value])
  const deploymentsCountSubscription = useSubscriptionWithDependencies(
    api.deployments.getDeploymentsCount,
    deploymentsCountSubscriptionArgs,
  )
  const deploymentsCount = computed(() => deploymentsCountSubscription.response)

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
.deployment-list {
  --virtual-scroller-item-gap: theme('spacing.2')
}

.deployment-list__deployment { @apply
  rounded-l-sm
}

.deployment-list__header { @apply
  flex
  items-center
  p-2
  gap-4
  h-min
}
</style>