<template>
  <p-icon-button-menu>
    <p-overflow-menu-item v-if="false" label="Send Test" />
    <router-link v-if="can.update.notification_policy" :to="routes.notificationEdit(notification.id)">
      <p-overflow-menu-item label="Edit" />
    </router-link>
    <p-overflow-menu-item v-if="can.delete.notification_policy" label="Delete" @click="open" />
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showModal"
    label="Notification"
    name="this notification"
    @delete="deleteNotification(notification.id)"
  />
</template>

<script lang="ts">
  export default {
    name: 'NotificationMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { Notification } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    notification: Notification,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const { showModal, open, close } = useShowModal()

  const deleteNotification = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, api.notifications.deleteNotification, 'Notification')
    emits('delete', id)
  }
</script>