<template>
  <p-icon-button-menu size="xs" v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="flow.id" />
    <p-overflow-menu-item label="Delete" @click="open" />
  </p-icon-button-menu>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    :name="flow.name"
    @delete="deleteFlow(flow.id)"
  />
</template>

<script lang="ts">
  import { PIconButtonMenu, POverflowMenuItem } from '@prefecthq/prefect-design'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'FlowMenu',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { Flow } from '@/models'
  import { flowsApiKey } from '@/services/FlowsApi'
  import { inject, deleteItem } from '@/utilities'

  defineProps<{
    flow: Flow,
  }>()

  const emit = defineEmits(['delete'])

  const { showModal, open, close } = useShowModal()

  const flowsApi = inject(flowsApiKey)

  const deleteFlow = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, flowsApi.deleteFlow, 'Flow')
    emit('delete', id)
  }
</script>