<template>
  <p-icon-button-menu size="xs">
    <p-overflow-menu-item v-if="false" label="Send Test" />
    <router-link v-if="can.update.notification" :to="editNotificationRoute(notification.id)">
      <p-overflow-menu-item label="Edit" />
    </router-link>
    <p-overflow-menu-item v-if="can.delete.notification" label="Delete" @click="open" />
  </p-icon-button-menu>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="notification"
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
  import { useShowModal } from '@/compositions/useShowModal'
  import { Notification } from '@/models'
  import { editNotificationRouteKey } from '@/router'
  import { notificationsApiKey } from '@/services/NotificationsApi'
  import { canKey } from '@/types/permissions'
  import { inject, deleteItem } from '@/utilities'

  defineProps<{
    notification: Notification,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const { showModal, open, close } = useShowModal()

  const NotificationApi = inject(notificationsApiKey)
  const editNotificationRoute = inject(editNotificationRouteKey)

  const deleteNotification = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, NotificationApi.deleteNotification, 'Notification')
    emits('delete', id)
  }

  const can = inject(canKey)
</script>