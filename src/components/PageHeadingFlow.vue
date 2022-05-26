<template>
  <page-heading class="page-heading-flow" :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <template #default="{ close }">
          <copy-overflow-menu-item label="Copy ID" :item="flow.id" @click="close" />
          <delete-overflow-menu-item :name="flow.name" @remove="deleteFlow(flow.id)" />
        </template>
      </p-icon-button-menu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu, showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import DeleteOverflowMenuItem from './DeleteOverflowMenuItem.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Flow } from '@/models'
  import { flowsApiKey } from '@/services/FlowsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flow: Flow,
  }>()

  const flowsApi = inject(flowsApiKey)

  const crumbs = computed(() => [{ text: props.flow.name }])

  const emit = defineEmits(['refresh'])

  const deleteFlow = async (id: string): Promise<void> => {
    try {
      await flowsApi.deleteFlow(id)
      showToast('Flow deleted successfully!', 'success', undefined, 3000)
      emit('refresh')
    } catch (error) {
      showToast('Failed to delete flow', 'error', undefined, 3000)
      console.error(error)
    }
  }
</script>