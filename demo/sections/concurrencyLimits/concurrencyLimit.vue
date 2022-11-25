<template>
  <ComponentPage title="Concurrency Limit">
    Concurrency
    {{ concurrenyLimit }}
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services'

  const concurrenyLimit = mocker.create('concurrencyLimit')
</script>