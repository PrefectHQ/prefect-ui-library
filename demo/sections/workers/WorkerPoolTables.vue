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
  import { useSeeds } from '@/demo/compositions/useSeeds'
  import { useWorkerPoolMock } from '@/demo/compositions/useWorkerPoolMock'
  import { useWorkerPoolQueuesMock } from '@/demo/compositions/useWorkerPoolQueueMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'Queues Table' }]
  const workerPool = useWorkerPoolMock()
  const workerPools = useWorkerPoolQueuesMock(15, { workerPoolId: workerPool.id })

  workerPool.defaultQueueId = workerPools[0].id
  useSeeds({
    workerPools: [workerPool],
  })
</script>
