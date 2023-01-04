<template>
  <ComponentPage title="Worker Pool Tables" :demos="demos">
    <template #queues-table>
      <WorkPoolQueuesTable :work-pool-name="workPool.name" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { WorkPoolQueuesTable } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useSeeds } from '@/demo/compositions/useSeeds'
  import { useWorkPoolMock } from '@/demo/compositions/useWorkPoolMock'
  import { useWorkPoolQueuesMock } from '@/demo/compositions/useWorkPoolQueueMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'Queues Table' }]
  const workPool = useWorkPoolMock()
  const workPoolQueuess = useWorkPoolQueuesMock(15, { workPoolId: workPool.id })

  workPool.defaultQueueId = workPoolQueuess[0].id
  useSeeds({
    workPools: [workPool],
  })
</script>
