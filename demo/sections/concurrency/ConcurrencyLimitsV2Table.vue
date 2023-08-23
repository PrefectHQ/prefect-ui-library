<template>
  <ComponentPage title="Concurrency Limit V2">
    <ConcurrencyLimitsV2Table />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ConcurrencyLimitsV2Table from '@/components/ConcurrencyLimitsV2Table.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useSeeds } from '@/demo/compositions/useSeeds'
  import { mocker } from '@/services'

  const concurrencyV2Limit = mocker.createMany('concurrencyV2Limit', 5)
  useSeeds({
    concurrencyV2Limit,
  })
</script>