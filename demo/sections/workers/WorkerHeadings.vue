<template>
  <ComponentPage title="Worker Headings" :demos="demos">
    <template #work-pools>
      <PageHeadingWorkPools />
    </template>
    <template #work-pool>
      <PageHeadingWorkPool :work-pool="workPool" />
    </template>
    <template #work-pool-create>
      <PageHeadingWorkPoolCreate :work-pool="workPool" />
    </template>
    <template #work-pool-edit>
      <PageHeadingWorkPoolEdit :work-pool="workPool" />
    </template>
    <template #work-pool-queue>
      <PageHeadingWorkPoolQueue :work-pool-queue="workPoolQueue" :work-pool-name="workPool.name" />
    </template>
    <template #work-pool-queue-create>
      <PageHeadingWorkPoolQueueCreate :work-pool-name="workPool.name" />
    </template>
    <template #work-pool-queue-edit>
      <PageHeadingWorkPoolQueueEdit :work-pool-queue-name="workPoolQueue.name" :work-pool-name="workPool.name" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PageHeadingWorkPool, PageHeadingWorkPoolCreate, PageHeadingWorkPoolEdit, PageHeadingWorkPools, PageHeadingWorkPoolQueueCreate, PageHeadingWorkPoolQueue, PageHeadingWorkPoolQueueEdit } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkPoolMock } from '@/demo/compositions/useWorkPoolMock'
  import { useWorkPoolQueueMock } from '@/demo/compositions/useWorkPoolQueueMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Work Pools' },
    { title: 'Work Pool' },
    { title: 'Work Pool Create' },
    { title: 'Work Pool Edit' },
    { title: 'Work Queue' },
    { title: 'Work Queue Create' },
    { title: 'Work Queue Edit' },
  ]

  const workPool = useWorkPoolMock()
  const workPoolQueue = useWorkPoolQueueMock({
    workPoolId: workPool.id,
  })
</script>