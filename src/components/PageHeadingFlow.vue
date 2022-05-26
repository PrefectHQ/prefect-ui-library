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
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import DeleteOverflowMenuItem from './DeleteOverflowMenuItem.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Flow } from '@/models'
  import { flowsApiKey } from '@/services/FlowsApi'
  import { deleteItem, inject } from '@/utilities'

  const props = defineProps<{
    flow: Flow,
  }>()

  const flowsApi = inject(flowsApiKey)

  const crumbs = computed(() => [{ text: props.flow.name }])

  const emit = defineEmits(['refresh'])

  const deleteFlow = async (id: string): Promise<void> => {
    deleteItem(id, flowsApi.deleteFlow, 'Flow')
    emit('refresh')
  }
</script>