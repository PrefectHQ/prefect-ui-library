<template>
  <p-icon-button-menu v-bind="$attrs" class="automation-menu">
    <CopyOverflowMenuItem label="Copy ID" :item="automation.id" />

    <router-link :to="routes.automationEdit(automation.id)">
      <p-overflow-menu-item v-if="can.update.automation" label="Edit" />
    </router-link>

    <p-overflow-menu-item v-if="can.delete.automation" label="Delete" @click="openDeleteAutomationModal" />

    <a :href="localization.docs.automations" target="_blank">
      <p-overflow-menu-item>
        Documentation
        <p-icon class="user-menu__icon" icon="ArrowTopRightOnSquareIcon" />
      </p-overflow-menu-item>
    </a>

    <slot />
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showDeleteAutomationModal"
    :name="automation.name"
    label="Automation"
    @delete="deleteAutomation"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { Automation } from '@/automations/types/automation'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { useShowModal, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'
  import { getApiErrorMessage } from '@/utilities/errors'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    automation: Automation,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const { showModal: showDeleteAutomationModal, open: openDeleteAutomationModal } = useShowModal()

  async function deleteAutomation(): Promise<void> {
    try {
      await api.automations.deleteAutomation(props.automation.id)
      showToast(localization.success.automationDelete, 'success')
      emit('delete')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.automationDelete)
      showToast(message, 'error')
    }
  }
</script>