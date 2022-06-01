<template>
  <DemoSection heading="Queue Form">
    <QueueForm :work-queue="queueData" @submit="submit" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import QueueForm from '@/components/QueueForm.vue'
  import { mocker } from '@/services'

  const queueData = mocker.create('workQueue')

  const submit = (): void => {
    console.log('Form submitted!')
  }
</script>