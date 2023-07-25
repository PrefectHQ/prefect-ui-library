<template>
  <p-tooltip text="Pause or resume this notification">
    <p-toggle v-if="can.update.notification_policy" v-model="internalValue" :loading="loading" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'
  import { Notification } from '@/models'

  const props = defineProps<{
    notification: Notification,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()

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
      await api.notifications.updateNotification(props.notification.id, notification)
      const message = value ? localization.success.activateNotification : localization.success.pauseNotification

      showToast(message, 'success')
      emit('update')
    } catch (error) {
      const message = value ? localization.error.activateNotification : localization.error.pauseNotification

      showToast(message, 'error')

      console.error(error)
    } finally {
      loading.value = false
    }
  }
</script>

