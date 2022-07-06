<template>
  <div class="flow-details">
    <p-key-value label="Flow ID" :value="flow.id" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(flow.created)" :alternate="alternate" />
  </div>
</template>

<script lang="ts" setup>
  import { formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { Flow } from '@/models/Flow'

  defineProps<{
    flow: Flow,
    alternate?: boolean,
  }>()
</script>

<style>
.flow-details { @apply
  flex
  flex-col
  gap-3
  items-start
}
</style>
