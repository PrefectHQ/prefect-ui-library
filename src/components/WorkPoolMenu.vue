<template>
  <p-icon-button-menu v-bind="$attrs" class="work-pool-menu">
    <CopyOverflowMenuItem label="Copy ID" :item="workPool.id" />

    <template v-if="workPool.can.update">
      <router-link :to="routes.workPoolEdit(workPool.name)">
        <p-overflow-menu-item label="Edit" />
      </router-link>
    </template>

    <template v-if="workPool.can.delete">
      <p-overflow-menu-item label="Delete" @click="open" />
    </template>

    <router-link :to="routes.automateWorkPool(workPool.id)">
      <p-overflow-menu-item label="Automate" />
    </router-link>

    <slot v-bind="{ workPool }" />
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showModal"
    label="Work Pool"
    :name="workPool.name"
    @delete="deleteWorkPool(workPool.name)"
  />
</template>

<script lang="ts" setup>
  import { refreshChannel } from '@prefecthq/vue-compositions'
  import { CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useShowModal, useWorkPoolsCount, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { WorkPool } from '@/models'
  import { deleteItem } from '@/utilities'

  defineOptions({
    inheritAttrs: false,
  })

  defineProps<{
    workPool: WorkPool,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const { showModal, open, close } = useShowModal()
  const { subscription: workPoolsCountSubscription } = useWorkPoolsCount()

  async function deleteWorkPool(name: string): Promise<void> {
    close()
    await deleteItem(name, api.workPools.deleteWorkPool, 'Work pool')
    refreshChannel(api.workPools.getWorkPools, [])
    workPoolsCountSubscription.refresh()
    emit('delete')
  }
</script>