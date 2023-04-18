<template>
  <div class="deployment-list">
    <p-layout-table sticky>
      <template #header-start>
        <slot name="header-start">
          <DeploymentsDeleteButton size="xs" :selected="selected" @delete="deleteDeployments" />
          <SelectedCount v-if="selected.length" :count="selected.length" />
        </slot>
      </template>

      <p-virtual-scroller
        :items="deployments"
        :item-estimate-height="140"
        :chunk-size="20"
        item-key="id"
      >
        <template #default="{ item }">
          <slot v-bind="{ item, selected, disabled, update: handleUpdate, delete: handleDelete }">
            <DeploymentListItem
              v-model:selected="selected"
              :value="item.id"
              :deployment="item"
              :disabled="disabled"
              class="deployment-list__deployment"
              @update="handleUpdate"
              @delete="handleDelete"
            />
          </slot>
        </template>
      </p-virtual-scroller>

      <template #footer-end>
        <slot name="footer-end" v-bind="{ page, pages }">
          <p-pager v-if="pages > 1" v-model:page="page" :pages="pages" />
        </slot>
      </template>
    </p-layout-table>
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
    disabled?: boolean,
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

  const refresh = (): void => {
    deploymentsSubscription.refresh()
    deploymentsCountSubscription.refresh()
  }

  const handleDelete = (deploymentId: string): void => {
    emit('delete', deploymentId)
    refresh()
  }

  const handleUpdate = (deploymentId: string): void => {
    emit('update', deploymentId)
    refresh()
  }

  const deleteDeployments = (): void => {
    emit('delete')
    refresh()
    selected.value = []
  }

  const selected = ref([])
</script>

<style>
.deployment-list {
  --virtual-scroller-item-gap: theme('spacing.2')
}

.deployment-list__deployment { @apply
  rounded-l-sm
}

.deployment-list__header { @apply
  h-7
}
</style>