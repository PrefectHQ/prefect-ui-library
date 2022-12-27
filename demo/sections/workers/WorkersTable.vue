<template>
  <ComponentPage title="Worker Table">
    <WorkersTable :worker-pool-name="workerPool.name" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { WorkersTable } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkerPoolMock } from '@/demo/compositions/useWorkerPoolMock'
  import { useWorkersMock } from '@/demo/compositions/useWorkersMock'

  const workerPool = useWorkerPoolMock()

  useWorkersMock(5, () => ({
    workerPoolId: workerPool.id,
  }))
</script>