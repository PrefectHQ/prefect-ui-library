<template>
  <p-table class="concurrency-limits-table__table" :columns="columns" :data="concurrencyLimits" />
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  const api = useWorkspaceApi()
  const columns = [
    {
      property: 'tag',
      label: 'Tag',
    },
    {
      property: 'created',
      label: 'Created',
    },
    {
      property: 'concurrencyLimit',
      label: 'Limit',
    },
    {
      label: 'Actions',
      width: '0px',
    },
  ]
  const concurrencyLimitSubscription = useSubscription(api.concurrencyLimits.getConcurrencyLimits)
  const concurrencyLimits = computed(() => concurrencyLimitSubscription.response ?? [])
</script>
