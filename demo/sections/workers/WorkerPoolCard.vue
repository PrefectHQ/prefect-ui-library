<template>
  <ComponentPage title="WorkerPoolCard">
    {{ workerPool }}
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { watchEffect } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkerPoolMock } from '@/demo/compositions/useWorkerPoolMock'

  const workerPool = useWorkerPoolMock()

  watchEffect(() => {
    console.log(workerPool)
  })
</script>