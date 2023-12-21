<template>
  <p-icon-button-menu v-bind="$attrs" class="work-pool-menu">
    <CopyOverflowMenuItem label="Copy ID" :item="workPool.id" />
    <router-link :to="routes.workPoolEdit(workPool.name)">
      <p-overflow-menu-item v-if="can.update.work_pool" label="Edit" />
    </router-link>
    <p-overflow-menu-item v-if="can.delete.work_pool" label="Delete" @click="open" />

    <slot v-bind="{ workPool }" />
  </p-icon-button-menu>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    label="Work Pool"
    :name="workPool.name"
    @delete="deleteWorkPool(workPool.name)"
  />
</template>

<script lang="ts">
  export default {
    name: 'WorkPoolMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useCan, useShowModal, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { WorkPool } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    workPool: WorkPool,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const { showModal, open, close } = useShowModal()

  async function deleteWorkPool(name: string): Promise<void> {
    close()
    await deleteItem(name, api.workPools.deleteWorkPool, 'Work pool')
    emit('delete')
  }
</script>