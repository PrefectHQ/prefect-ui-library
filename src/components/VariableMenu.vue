<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item :label="localization.info.copyId" :item="variable.id" />
    <copy-overflow-menu-item :label="localization.info.copyName" :item="variable.name" />
    <copy-overflow-menu-item :label="localization.info.copyValue" :item="variable.value" />
    <p-overflow-menu-item v-if="can.update.variable" :label="localization.info.edit" @click="openEditModal" />
    <p-overflow-menu-item v-if="can.delete.variable" :label="localization.info.delete" @click="openDeleteModal" />
  </p-icon-button-menu>

  <!-- TODO: Add edit modal when that's available -->

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
  import { showToast } from '@prefecthq/prefect-design'
  import { ConfirmDeleteModal, CopyOverflowMenuItem } from '@/components'
  import { useWorkspaceApi, useCan, useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { Variable } from '@/models'

  defineProps<{
    variable: Variable,
  }>()

  const emit = defineEmits<{
    (event: 'delete', value: string): void,
    (event: 'update'): void,
  }>()

  const can = useCan()

  const { showModal: showDeleteModal, open: openDeleteModal, close: closeDeleteModal } = useShowModal()
  const { open: openEditModal } = useShowModal()

  const api = useWorkspaceApi()

  const deleteVariable = async (id: string): Promise<void> => {
    closeDeleteModal()

    try {
      await api.variables.deleteVariable(id)
      showToast(localization.success.delete(localization.info.variable), 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.delete(localization.info.variable.toLowerCase()), 'error')
      emit('delete', id)
    }
  }
</script>