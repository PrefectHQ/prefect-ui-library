<template>
  <ComponentPage title="CodeBanner" :demos="demos">
    <CodeBanner :command="command" />

    <template #with-title>
      <CodeBanner :title="title" :command="command" />
    </template>

    <template #with-title-and-subtitle>
      <CodeBanner :title="title" :subtitle="subtitle" :command="command" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import CodeBanner from '@/components/CodeBanner.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'With Title' },
    { title: 'With Title and Subtitle' },
  ]

  const title = 'Work queue is ready to go!'
  const subtitle = 'Work queues define the work to be done and agents poll a specific work queue for new work.'
  const command = 'prefect agent start  --work-queue "default"'
</script>