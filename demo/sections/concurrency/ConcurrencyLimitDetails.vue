<template>
  <ComponentPage title="ConcurrencyLimitDetails">
    <ConcurrencyLimitDetails :concurrency-limit="concurrencyLimit" />
  </componentpage>
</template>

<script lang="ts" setup>
  import ConcurrencyLimitDetails from '@/components/ConcurrencyLimitDetails.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services'

  const concurrencyLimit = mocker.create('concurrencyLimit')
</script>