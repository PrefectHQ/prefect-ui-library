<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="flow.id" />

    <template v-if="can.delete.flow">
      <p-overflow-menu-item label="Delete" :value="flow.id" @click="openDeleteModal" />
    </template>

    <slot v-bind="{ flow }">
      <router-link v-if="can.create.automation" :to="routes.automateFlow(flow.id)">
        <p-overflow-menu-item label="Automate" />
      </router-link>
    </slot>
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-if="flow"
    v-model:showModal="showDeleteModal"
    label="Flow"
    :name="flow.name!"
    @delete="deleteFlow(flow.id)"
  />
</template>

<script lang="ts" setup>
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { ConfirmDeleteModal } from '@/components/index'
  import { useCan, useShowModal, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { Flow } from '@/models'
  import { deleteItem } from '@/utilities'

  defineOptions({
    inheritAttrs: false,
  })

  defineProps<{
    flow: Flow,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()

  const emit = defineEmits(['delete'])

  const deleteFlow = async (id: string): Promise<void> => {
    await deleteItem(id, api.flows.deleteFlow, 'Flow')
    emit('delete', id)
  }
</script>