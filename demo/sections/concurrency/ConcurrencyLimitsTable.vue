<template>
  <ComponentPage title="Concurrency Limit">
    <ConcurrencyLimitsTable />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ConcurrencyLimitsTable from '@/components/ConcurrencyLimitsTable.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useSeeds } from '@/demo/compositions/useSeeds'
  import { mocker } from '@/services'

  const concurrencyLimit = mocker.createMany('concurrencyLimit', 5)
  useSeeds({
    concurrencyLimit,
  })
</script>