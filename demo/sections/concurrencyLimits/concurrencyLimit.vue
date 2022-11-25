<template>
  <ComponentPage title="Concurrency Limit">
    Concurrency
    {{ concurrencyLimit }}
    <ConcurrencyLimitCreateForm />
  </componentpage>
</template>

<script lang="ts" setup>
  import ConcurrencyLimitCreateForm from '@/components/ConcurrencyLimitCreateForm.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services'

  const concurrencyLimit = mocker.create('concurrencyLimit')
</script>