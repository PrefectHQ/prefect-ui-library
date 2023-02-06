<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="workQueue.id" />
    <router-link v-if="can.update.work_queue && !workQueue.deprecated" :to="routes.workQueueEdit(workQueue.id)">
      <p-overflow-menu-item label="Edit" />
    </router-link>
    <slot v-bind="{ workQueue }" />
    <p-overflow-menu-item v-if="showDelete" label="Delete" @click="open" />
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showModal"
    label="Work Queue"
    :name="workQueue.name"
    @delete="deleteWorkQueue(workQueue.id)"
  />
</template>

<script lang="ts">
  export default {
    name: 'WorkQueueMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { PIconButtonMenu, POverflowMenuItem } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { WorkQueue } from '@/models'
  import { deleteItem } from '@/utilities'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()
  const routes = useWorkspaceRoutes()
  const { showModal, open, close } = useShowModal()

  const workPoolsSubscription = useSubscription(api.workPools.getWorkPools, [])
  const workPools = computed(() => workPoolsSubscription.response ?? [])

  const isDefaultQueue = computed(() => {
    return workPools.value.some(workPool => workPool.defaultQueueId === props.workQueue.id)
  })

  const showDelete = computed(() => {
    return !isDefaultQueue.value && can.delete.work_queue
  })

  const deleteWorkQueue = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, api.workQueues.deleteWorkQueue, 'Work queue')
    emits('delete', id)
  }
</script>