<template>
  <DemoSection heading="Notifications">
    <DemoSubSection heading="Notification Detail">
      <!--  -->
    </DemoSubSection>
    <DemoSubSection heading="Notification Table">
      <!--  -->
    </DemoSubSection>
    <DemoSubSection heading="Notification Form">
      <!--  -->
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { mocker } from '@/services'
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