<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="flow.id" />
    <p-overflow-menu-item v-if="can.delete.flow" label="Delete" @click="open" />
    <slot v-bind="{ flow }" />
  </p-icon-button-menu>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    :name="flow.name"
    label="Flow"
    @delete="deleteFlow(flow.id)"
  />
</template>

<script lang="ts">
  export default {
    name: 'FlowMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { Flow } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    flow: Flow,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const can = useCan()

  const { showModal, open, close } = useShowModal()

  const api = useWorkspaceApi()

  const deleteFlow = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, api.flows.deleteFlow, 'Flow')
    emits('delete', id)
  }
</script>