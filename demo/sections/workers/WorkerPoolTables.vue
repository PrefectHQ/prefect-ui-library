<template>
  <ComponentPage title="Worker Pool Tables" :demos="demos">
    <template #queues-table>
      <WorkerPoolQueuesTable :worker-pool-queues="workerPoolQueues" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { WorkerPoolQueuesTable } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkerPoolQueuesMock } from '@/demo/compositions/useWorkerPoolQueueMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'Queues Table' }]
  const workerPoolQueues = useWorkerPoolQueuesMock(15)
</script>
