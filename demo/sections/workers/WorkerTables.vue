<template>
  <ComponentPage title="Worker Tables" :demos="demos">
    <template #worker-queues-table />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'Worker Queues Table' }]
</script>
