<template>
  <DemoSection heading="Notifications">
    <DemoSubSection heading="Notification Overflow Menu">
      <NotificationMenu :notification="notification" />
    </DemoSubSection>
    <DemoSubSection heading="Notification Detail">
      <!--  -->
    </DemoSubSection>
    <DemoSubSection heading="Notification Table">
      <NotificationStatusSelect v-model:selected="searchTerm" />
      <!--  -->
    </DemoSubSection>
    <DemoSubSection heading="Notification Form">
      <NotificationForm v-model:notification="notification" @submit="submit" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { NotificationForm } from '@/components'

  import NotificationMenu from '@/components/NotificationMenu.vue'
  import NotificationStatusSelect from '@/components/NotificationStatusSelect.vue'
  import { Notification, NotificationStatus } from '@/models'
  import { mocker } from '@/services'

  const searchTerm = ref<NotificationStatus>('all')

  const notification = mocker.create('notification')
  const emptyNotification = {
    blockDocumentId: mocker.create('id'),
    created: mocker.create('date'),
    id: mocker.create('id'),
    isActive: mocker.create('boolean'),
    name: 'very-important-notification',
    states: [],
    tags: [],
    updated: mocker.create('date'),
  }

  const submit = (notification: Notification): void => {
    console.log('Form submitted!', notification)
  }
</script>