<template>
  <DemoSection heading="Notifications">
    <DemoSubSection heading="Notification Detail">
      <!--  -->
    </DemoSubSection>
    <DemoSubSection heading="Notification Table">
      <NotificationStatusSelect v-model:selected="searchTerm" />
      <!--  -->
    </DemoSubSection>
    <DemoSubSection heading="Notification Form">
      <!--  -->
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import NotificationStatusSelect from '@/components/NotificationStatusSelect.vue'
  import { NotificationStatus } from '@/models'
  import { mocker } from '@/services'

  const searchTerm = ref<NotificationStatus>('all')

  const notification = mocker.create('notification')
  const emptyNotification = {
    blockDocumentId: mocker.create('id'),
    created: mocker.create('date'),
    id: mocker.create('id'),
    isActive: mocker.create('boolean'),
    name: 'very-important-notification',
    stateNames: [],
    tags: [],
    updated: mocker.create('date'),
  }
</script>