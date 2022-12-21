<template>
  <ComponentPage title="Worker Headings" :demos="demos">
    <template #worker-pools>
      <PageHeadingWorkerPools />
    </template>
    <template #worker-pool>
      <PageHeadingWorkerPool :worker-pool="workerPool" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PageHeadingWorkerPool, PageHeadingWorkerPools } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkerPoolMock } from '@/demo/compositions/useWorkerPoolMock'
  import { useWorkerPoolQueuesMock } from '@/demo/compositions/useWorkerPoolQueueMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Worker Pools' },
    { title: 'Worker Pool' },
  ]

  const workerPool = useWorkerPoolMock()
  const workerPoolQueue = useWorkerPoolQueuesMock(3)
</script>