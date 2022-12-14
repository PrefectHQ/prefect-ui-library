<template>
  <div class="concurrency-limit-details">
    <p-key-value label="Tag" :value="concurrencyLimit.tag" :alternate="alternate" />

    <p-divider />

    <p-key-value label="Concurrency Limit Count" :value="concurrencyLimit.concurrencyLimit" :alternate="alternate" />

    <p-key-value label="Concurrency Limit Active Task Runs Count" :value="concurrencyLimit.activeSlots?.length" :alternate="alternate" />

    <p-key-value label="Concurrency Limit ID" :value="concurrencyLimit.id" :alternate="alternate" />

    <p-key-value v-if="concurrencyLimit.created" label="Created" :value="formatDateTimeNumeric(concurrencyLimit.created)" :alternate="alternate" />

    <p-key-value v-if="concurrencyLimit.updated" label="Updated" :value="formatDateTimeNumeric(concurrencyLimit.updated)" :alternate="alternate" />
  </div>
</template>

<script lang="ts" setup>
  import { ConcurrencyLimit } from '@/models/ConcurrencyLimit'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  defineProps<{
    concurrencyLimit: ConcurrencyLimit,
    alternate?: boolean,
  }>()
</script>

<style>
.concurrency-limit-details { @apply
  flex
  flex-col
  gap-3
  items-start
}
</style>