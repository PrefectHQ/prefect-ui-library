<template>
  <div class="flow-details">
    <p-key-value label="Flow ID" :value="flow.id" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(flow.created)" :alternate="alternate" />

    <p-key-value label="Updated" :value="formatDateTimeNumeric(flow.updated)" :alternate="alternate" />
  </div>
</template>

<script lang="ts" setup>
  import { Flow } from '@/models/Flow'
  import { formatDateTimeNumeric } from '@/utilities/dates'

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
