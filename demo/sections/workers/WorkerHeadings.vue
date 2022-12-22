<template>
  <ComponentPage title="Worker Headings" :demos="demos">
    <template #worker-pools>
      <PageHeadingWorkerPools />
    </template>
    <template #worker-pool>
      <div class="worker-headings__header-container">
        <PageHeadingWorkerPool :worker-pool="workerPool" />
      </div>
    </template>
    <template #worker-pool-create>
      <PageHeadingWorkerPoolCreate :worker-pool="workerPool" />
    </template>
    <template #worker-pool-edit>
      <PageHeadingWorkerPoolEdit :worker-pool="workerPool" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PageHeadingWorkerPool, PageHeadingWorkerPoolCreate, PageHeadingWorkerPoolEdit, PageHeadingWorkerPools } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkerPoolMock } from '@/demo/compositions/useWorkerPoolMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Worker Pools' },
    { title: 'Worker Pool' },
    { title: 'Worker Pool Create' },
    { title: 'Worker Pool Edit' },
  ]

  const workerPool = useWorkerPoolMock()
</script>

<style>
.worker-headings__header-container { @apply
  mb-48
}
</style>