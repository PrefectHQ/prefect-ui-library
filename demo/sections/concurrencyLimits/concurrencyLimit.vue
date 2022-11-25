<template>
  <ComponentPage title="Concurrency Limit">
    Concurrency
    {{ concurrencyLimit }}
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services'

  const concurrencyLimit = mocker.create('concurrencyLimit')
</script>