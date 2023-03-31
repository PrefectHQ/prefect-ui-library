<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item :label="localization.info.copyId" :item="variable.id" />
    <copy-overflow-menu-item :label="localization.info.copyName" :item="variable.name" />
    <copy-overflow-menu-item :label="localization.info.copyValue" :item="variable.value" />

    <template v-if="can.update.variable">
      <p-overflow-menu-item :label="localization.info.edit" @click="openEditModal" />
    </template>

    <p-overflow-menu-item v-if="can.delete.variable" :label="localization.info.delete" @click="openDeleteModal" />
  </p-icon-button-menu>

  <!-- TODO: Add edit menu when that's available -->

  <ConfirmDeleteModal
    v-model:showModal="showDeleteModal"
    :label="localization.info.delete"
    :name="variable.name"
    @delete="deleteVariable(variable.id)"
  />
</template>

<script lang="ts">
  export default {
    name: 'VariableMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { ConfirmDeleteModal, CopyOverflowMenuItem } from '@/components'
  import { useWorkspaceApi, useCan, useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { Variable } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    variable: Variable,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const can = useCan()

  const { showModal: showDeleteModal, open: openDeleteModal, close: closeDeleteModal } = useShowModal()
  const { showModal: showEditModal, open: openEditModal, close: closeEditModal } = useShowModal()

  const api = useWorkspaceApi()

  const deleteVariable = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, api.deployments.deleteDeployment, 'Deployment')
    emits('delete', id)
  }
</script>