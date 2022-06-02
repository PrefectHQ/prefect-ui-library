<template>
  <page-heading class="page-heading-flow" :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <copy-overflow-menu-item label="Copy ID" :item="flow.id" />
        <p-overflow-menu-item label="Delete" @click="open" />
      </p-icon-button-menu>
      <ConfirmDeleteModal
        v-model:showModal="showModal"
        :name="flow.name"
        @delete="deleteFlow(flow.id)"
      />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { Flow } from '@/models'
  import { flowsApiKey } from '@/services/FlowsApi'
  import { deleteItem, inject } from '@/utilities'

  const props = defineProps<{
    flow: Flow,
  }>()

  const flowsApi = inject(flowsApiKey)

  const { showModal, open } = useShowModal()

  const crumbs = computed(() => [{ text: props.flow.name }])

  const emit = defineEmits(['delete'])

  const deleteFlow = async (id: string): Promise<void> => {
    await deleteItem(id, flowsApi.deleteFlow, 'Flow')
    emit('delete', id)
  }
</script>