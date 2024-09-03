<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="concurrencyLimit.id" />
    <p-overflow-menu-item v-if="can.delete.concurrency_limit" label="Delete" @click="open" />
    <p-overflow-menu-item v-if="can.update.concurrency_limit" label="Edit" @click="openEdit" />
    <p-overflow-menu-item v-if="can.update.concurrency_limit" label="Reset" @click="openReset" />
  </p-icon-button-menu>
  <ConcurrencyLimitsV2UpdateModal v-model:showModal="showEditModal" :concurrency-limit="concurrencyLimit" />
  <ConcurrencyLimitV2ResetModal v-model:showModal="showResetModal" :concurrency-limit="concurrencyLimit" />
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    :name="concurrencyLimit.name"
    label="Concurrency Limit"
    @delete="deleteConcurrencyLimit(concurrencyLimit.id)"
  />
</template>

<script lang="ts">
  export default {
    name: 'ConcurrencyV2LimitsMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { CopyOverflowMenuItem, ConcurrencyLimitV2ResetModal, ConfirmDeleteModal, ConcurrencyLimitsV2UpdateModal } from '@/components'
  import { useShowModal, useCan, useWorkspaceApi } from '@/compositions'
  import { ConcurrencyV2Limit } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    concurrencyLimit: ConcurrencyV2Limit,
  }>()

  const emit = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const can = useCan()

  const { showModal, open, close } = useShowModal()

  const { showModal: showEditModal, open: openEdit } = useShowModal()

  const { showModal: showResetModal, open: openReset } = useShowModal()

  const api = useWorkspaceApi()

  const deleteConcurrencyLimit = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, api.concurrencyV2Limits.deleteConcurrencyV2Limit, 'Concurrency Limit')
    emit('delete', id)
  }
</script>
