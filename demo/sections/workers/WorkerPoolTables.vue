<template>
  <ComponentPage title="Worker Pool Tables" :demos="demos">
    <template #queues-table>
      <WorkerPoolQueuesTable :worker-pool-name="workerPool.name" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { WorkerPoolQueuesTable } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkerPoolMock } from '@/demo/compositions/useWorkerPoolMock'
  import { useWorkerPoolQueuesMock } from '@/demo/compositions/useWorkerPoolQueueMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'Queues Table' }]
  const workerPool = useWorkerPoolMock()
  useWorkerPoolQueuesMock(15, { workerPoolId: workerPool.id })
</script>
