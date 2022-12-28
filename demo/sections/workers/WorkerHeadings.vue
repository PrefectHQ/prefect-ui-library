<template>
  <ComponentPage title="Worker Headings" :demos="demos">
    <template #worker-pools>
      <PageHeadingWorkerPools />
    </template>
    <template #worker-pool>
      <PageHeadingWorkerPool :worker-pool="workerPool" />
    </template>
    <template #worker-pool-create>
      <PageHeadingWorkerPoolCreate :worker-pool="workerPool" />
    </template>
    <template #worker-pool-edit>
      <PageHeadingWorkerPoolEdit :worker-pool="workerPool" />
    </template>
    <template #worker-pool-queue>
      <PageHeadingWorkerPoolQueue :worker-pool-queue="workerPoolQueue" :worker-pool-name="workerPool.name" />
    </template>
    <template #worker-pool-queue-create>
      <PageHeadingWorkerPoolQueueCreate :worker-pool-name="workerPool.name" />
    </template>
    <template #worker-pool-queue-edit>
      <PageHeadingWorkerPoolQueueEdit :worker-pool-queue-name="workerPoolQueue.name" :worker-pool-name="workerPool.name" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PageHeadingWorkerPool, PageHeadingWorkerPoolCreate, PageHeadingWorkerPoolEdit, PageHeadingWorkerPools, PageHeadingWorkerPoolQueueCreate, PageHeadingWorkerPoolQueue, PageHeadingWorkerPoolQueueEdit } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkerPoolMock } from '@/demo/compositions/useWorkerPoolMock'
  import { useWorkerPoolQueueMock } from '@/demo/compositions/useWorkerPoolQueueMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Worker Pools' },
    { title: 'Worker Pool' },
    { title: 'Worker Pool Create' },
    { title: 'Worker Pool Edit' },
    { title: 'Worker Pool Queue' },
    { title: 'Worker Pool Queue Create' },
    { title: 'Worker Pool Queue Edit' },
  ]

  const workerPool = useWorkerPoolMock()
  const workerPoolQueue = useWorkerPoolQueueMock({
    workerPoolId: workerPool.id,
  })
</script>