<template>
  <div class="deployment-list">
    <p-layout-table :root-margin="margin" sticky>
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
          <slot v-bind="{ item, selected, selectable, update: handleUpdate, delete: handleDelete }">
            <DeploymentListItem
              v-model:selected="selected"
              :value="item.id"
              :deployment="item"
              :selectable="selectable"
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
  import { useDeployments, useDeploymentsFilterFromRoute, useOffsetStickyRootMargin } from '@/compositions'
  import { DeploymentsFilter } from '@/models'

  const props = defineProps<{
    filter?: DeploymentsFilter,
    selectable?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update' | 'delete', value?: string): void,
  }>()

  const { margin } = useOffsetStickyRootMargin()


  const { filter: routeFilter } = useDeploymentsFilterFromRoute()

  const filter = computed<DeploymentsFilter>(() => {
    return {
      ...props.filter,
      deployments: {
        ...props.filter?.deployments,
        ...routeFilter.deployments,
      },
      limit: 40,
    }
  })

  const { subscriptions, deployments, page, pages } = useDeployments(filter)

  const handleDelete = (deploymentId: string): void => {
    emit('delete', deploymentId)
    subscriptions.refresh()
  }

  const handleUpdate = (deploymentId: string): void => {
    emit('update', deploymentId)
    subscriptions.refresh()
  }

  const deleteDeployments = (): void => {
    emit('delete')
    subscriptions.refresh()
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