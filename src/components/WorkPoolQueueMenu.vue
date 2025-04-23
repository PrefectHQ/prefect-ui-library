<template>
  <p-icon-button-menu v-bind="$attrs" class="work-pool-queue-menu">
    <CopyOverflowMenuItem label="Copy ID" :item="workPoolQueue.id" />

    <slot v-bind="{ workPoolQueue }">
      <router-link v-if="can.create.automation" :to="routes.automateWorkPoolQueue(workPoolQueue.id)">
        <p-overflow-menu-item label="Automate" />
      </router-link>
    </slot>

    <template v-if="workPoolQueue.can.update">
      <router-link :to="routes.workPoolQueueEdit(workPoolName, workPoolQueue.name)">
        <p-overflow-menu-item label="Edit" />
      </router-link>
    </template>

    <template v-if="showDelete">
      <p-overflow-menu-item label="Delete" @click="open" />
    </template>
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showModal"
    label="Work Queue"
    :name="workPoolQueue.name"
    @delete="deleteWorkPoolQueue(workPoolQueue.name)"
  />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useCan, useShowModal, useWorkPool, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { WorkPoolQueue } from '@/models'
  import { deleteItem } from '@/utilities'

  defineOptions({
    inheritAttrs: false,
  })

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
  const { workPool } = useWorkPool(() => props.workPoolName)

  const showDelete = computed(() => {
    if (!workPool.value) {
      return false
    }

    const isDefaultWorkQueue = workPool.value.defaultQueueId === props.workPoolQueue.id

    return !isDefaultWorkQueue && props.workPoolQueue.can.delete
  })

  async function deleteWorkPoolQueue(name: string): Promise<void> {
    close()
    await deleteItem([props.workPoolName, name], api.workPoolQueues.deleteWorkPoolQueue, 'Work queue')
    emit('delete')
  }
</script>