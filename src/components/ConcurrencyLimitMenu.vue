<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="concurrencyLimit.id" />
    <p-overflow-menu-item v-if="can.delete.concurrency_limit" label="Delete" @click="open" />
  </p-icon-button-menu>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    :name="concurrencyLimit.tag"
    label="Concurrency Limit"
    @delete="deleteConcurrencyLimit(concurrencyLimit.id)"
  />
</template>

<script lang="ts">
  import { PIconButtonMenu, POverflowMenuItem } from '@prefecthq/prefect-design'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ConcurrencyLimitMenu',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { ConcurrencyLimit } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    concurrencyLimit: ConcurrencyLimit,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const can = useCan()

  const { showModal, open, close } = useShowModal()

  const api = useWorkspaceApi()

  const deleteConcurrencyLimit = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, api.concurrencyLimits.deleteConcurrencyLimit, 'Concurrency Limit')
    emits('delete', id)
  }
</script>