<template>
  <ComponentPage title="Worker Pools Stuff">
    <WorkerPoolCard :worker-pool="workerPool" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import WorkerPoolCard from '@/components/WorkerPoolCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkerPoolMock } from '@/demo/compositions/useWorkerPoolMock'
  import { useWorkerPoolQueuesMock } from '@/demo/compositions/useWorkerPoolQueueMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Pools' },
    { title: 'Queues' },
  ]

  const workerPool = useWorkerPoolMock()
  const workerPoolQueue = useWorkerPoolQueuesMock(3)
</script>