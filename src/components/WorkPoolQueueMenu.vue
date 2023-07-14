<template>
  <p-icon-button-menu v-bind="$attrs" class="work-pool-queue-menu">
    <CopyOverflowMenuItem label="Copy ID" :item="workPoolQueue.id" />
    <slot v-bind="{ workPoolQueue }" />
    <router-link :to="routes.workPoolQueueEdit(workPoolName, workPoolQueue.name)">
      <p-overflow-menu-item v-if="can.update.work_queue" label="Edit" />
    </router-link>
    <p-overflow-menu-item v-if="showDelete" label="Delete" @click="open" />
  </p-icon-button-menu>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    label="Work Queue"
    :name="workPoolQueue.name"
    @delete="deleteWorkPoolQueue(workPoolQueue.name)"
  />
</template>

<script lang="ts">
  export default {
    name: 'WorkPoolQueueMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useCan, useShowModal, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { WorkPoolQueue } from '@/models'
  import { deleteItem } from '@/utilities'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueue: WorkPoolQueue,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const { showModal, open, close } = useShowModal()
  const workPoolSubscription = useSubscription(api.workPools.getWorkPoolByName, [props.workPoolName])
  const workPool = computed(() => workPoolSubscription.response)

  const showDelete = computed(() => {
    return !workPool.value || workPool.value.defaultQueueId !== props.workPoolQueue.id && can.delete.work_queue
  })

  async function deleteWorkPoolQueue(name: string): Promise<void> {
    close()
    await deleteItem([props.workPoolName, name], api.workPoolQueues.deleteWorkPoolQueue, 'Work queue')
    emit('delete')
  }
</script>