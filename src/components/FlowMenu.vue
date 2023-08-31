<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="flow.id" />
    <p-overflow-menu-item label="Delete" :value="flow.id" @click="openDeleteModal" />
    <slot v-bind="{ flow }" />
  </p-icon-button-menu>
  <ConfirmDeleteModal
    v-if="flow"
    v-model:showModal="showDeleteModal"
    label="Flow"
    :name="flow.name!"
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
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { ConfirmDeleteModal } from '@/components/index'
  import { useShowModal, useWorkspaceApi } from '@/compositions'
  import { Flow } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    flow: Flow,
  }>()

  const api = useWorkspaceApi()
  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()

  const emit = defineEmits(['delete'])

  const deleteFlow = async (id: string): Promise<void> => {
    await deleteItem(id, api.flows.deleteFlow, 'Flow')
    emit('delete', id)
  }
</script>