<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="concurrencyLimit.id" />
    <p-overflow-menu-item v-if="can.delete.concurrency_limit" label="Delete" @click="open" />
    <p-overflow-menu-item v-if="can.update.concurrency_limit" label="Reset" @click="openReset" />
  </p-icon-button-menu>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    :name="concurrencyLimit.tag"
    label="Concurrency Limit"
    @delete="deleteConcurrencyLimit(concurrencyLimit.id)"
  />
  <ConcurrencyLimitResetModal v-model:showModal="showResetModal" :concurrency-limit="concurrencyLimit" />
</template>

<script lang="ts">
  export default {
    name: 'ConcurrencyLimitsMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { CopyOverflowMenuItem, ConfirmDeleteModal, ConcurrencyLimitResetModal } from '@/components'
  import { useShowModal, useCan, useWorkspaceApi } from '@/compositions'
  import { ConcurrencyLimit } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    concurrencyLimit: ConcurrencyLimit,
  }>()

  const emit = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const can = useCan()

  const { showModal, open, close } = useShowModal()

  const { showModal: showResetModal, open: openReset } = useShowModal()

  const api = useWorkspaceApi()

  const deleteConcurrencyLimit = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, api.concurrencyLimits.deleteConcurrencyLimit, 'Concurrency Limit')
    emit('delete', id)
  }
</script>