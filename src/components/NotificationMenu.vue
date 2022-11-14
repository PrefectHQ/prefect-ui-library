<template>
  <p-icon-button-menu>
    <p-overflow-menu-item v-if="false" label="Send Test" />
    <router-link v-if="can.update.notification_policy" :to="editNotificationRoute(notification.id)">
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
  import { PIconButtonMenu, POverflowMenuItem } from '@prefecthq/prefect-design'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'NotificationMenu',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { Notification } from '@/models'
  import { editNotificationRouteKey } from '@/router'
  import { inject, deleteItem } from '@/utilities'

  defineProps<{
    notification: Notification,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()

  const { showModal, open, close } = useShowModal()

  const editNotificationRoute = inject(editNotificationRouteKey)

  const deleteNotification = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, api.notifications.deleteNotification, 'Notification')
    emits('delete', id)
  }
</script>