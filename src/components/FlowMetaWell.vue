<template>
  <div class="flow-meta-well">
    <p-key-value label="Flow ID" :value="flow.id" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(flow.created)" :alternate="alternate" />

    <p-key-value label="Tags" :alternate="alternate">
      <template #value>
        <p-tag v-for="tag in flow.tags" :key="tag" class="flow-meta-well__tags">
          {{ tag }}
        </p-tag>
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue, PTag, formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { Flow } from '@/models'

  defineProps<{
    flow: Flow,
    alternate?: boolean,
  }>()
</script>

<style>
  .flow-meta-well {
    @apply
    flex
    flex-col
    gap-3
  }

  .flow-meta-well__tags {
    @apply
    mb-1
    mr-1
  }
</style>