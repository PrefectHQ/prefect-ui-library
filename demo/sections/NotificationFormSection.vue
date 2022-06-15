<template>
  <DemoSection heading="Notification Form">
    <NotificationForm v-model:notification="notificationData" @submit="submit" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import { NotificationForm } from '@/components'
  import { Notification } from '@/models'
  import { mocker } from '@/services'

  const notificationData = ref(mocker.create('notification'))

  const submit = (notification: Notification): void => {
    console.log('Form submitted!', notification)
  }
</script>