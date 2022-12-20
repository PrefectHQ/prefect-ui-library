<template>
  <ComponentPage title="Worker Pools Stuff" :demos="demos">
    <template #pools>
      {{ workerPool }}
    </template>
    <template #queues>
      {{ workerPoolQueue }}
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkerPoolMock } from '@/demo/compositions/useWorkerPoolMock'
  import { useWorkerPoolQueueMock } from '@/demo/compositions/useWorkerPoolQueueMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Pools' },
    { title: 'Queues' },
  ]

  const workerPool = useWorkerPoolMock()
  const workerPoolQueue = useWorkerPoolQueueMock()
</script>