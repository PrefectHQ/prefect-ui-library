<template>
  <p-toggle v-model="internalValue" :loading="loading" />
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { Notification } from '@/models'
  import { notificationsApiKey } from '@/services/NotificationsApi'
  import { inject } from '@/utilities'

  const props = defineProps<{
    notification: Notification,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const notificationsApi = inject(notificationsApiKey)

  const internalValue = computed({
    get() {
      return !!props.notification.isActive
    },
    set(value: boolean) {
      toggleNotification(value)
    },
  })

  const loading = ref(false)

  const toggleNotification = async (value: boolean): Promise<void> => {
    loading.value = true

    try {
      const notification = { isActive: value }
      await notificationsApi.updateNotification(props.notification.id, notification)
      const activeOrPaused = value ? 'Active' : 'Paused'
      showToast(`Notification ${activeOrPaused}`, 'success', undefined, 3000)
      emit('update')
    } catch (error) {
      showToast(`${error}`, 'error', undefined, 3000)
    } finally {
      loading.value = false
    }
  }
</script>

