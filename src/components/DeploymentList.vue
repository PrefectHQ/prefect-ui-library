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
        :items="deployments ?? []"
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
  import { computed, ref } from 'vue'
  import {
    DeploymentsDeleteButton,
    DeploymentListItem,
    SelectedCount
  } from '@/components'
  import { useDeployments, useDeploymentsCount, useDeploymentsFilterFromRoute } from '@/compositions'
  import { DeploymentsFilter } from '@/models'

  const props = defineProps<{
    filter?: DeploymentsFilter,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update' | 'delete', value?: string): void,
  }>()

  const DEFAULT_LIMIT = 40

  const { filter: routeFilter } = useDeploymentsFilterFromRoute()
  const page = ref(1)
  const offset = computed({
    get: () => (page.value - 1) * DEFAULT_LIMIT,
    set: (value: number) => {
      page.value = Math.ceil(value / DEFAULT_LIMIT) + 1
    },
  })
  const pages = computed(() => Math.ceil((count.value ?? DEFAULT_LIMIT) / DEFAULT_LIMIT))

  const filter = computed<DeploymentsFilter>(() => {
    return {
      ...props.filter,
      deployments: {
        ...props.filter?.deployments,
        ...routeFilter.deployments,
      },
      offset: offset.value,
      limit: DEFAULT_LIMIT,
    }
  })

  const { subscription: deploymentsSubscription, deployments } = useDeployments(filter)
  const { subscription: deploymentsCountSubscription, count } = useDeploymentsCount(filter)

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

.deployment-list__header { @apply
  h-7
}
</style>