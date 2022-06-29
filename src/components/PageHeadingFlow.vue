<template>
  <page-heading class="page-heading-flow" :crumbs="crumbs">
    <template #actions>
      <FlowMenu :flow="flow" />
      <ConfirmDeleteModal
        v-model:showModal="showModal"
        :name="flow.name"
        @delete="deleteFlow(flow.id)"
      />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import FlowMenu from '@/components/FlowMenu.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { Flow } from '@/models'
  import { flowsApiKey } from '@/services'
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