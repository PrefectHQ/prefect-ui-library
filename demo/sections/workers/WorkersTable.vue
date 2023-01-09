<template>
  <ComponentPage title="Worker Table">
    <WorkersTable :work-pool-name="workPool.name" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { WorkersTable } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkPoolMock } from '@/demo/compositions/useWorkPoolMock'
  import { useWorkersMock } from '@/demo/compositions/useWorkersMock'

  const workPool = useWorkPoolMock()

  useWorkersMock(5, () => ({
    workPoolId: workPool.id,
  }))
</script>