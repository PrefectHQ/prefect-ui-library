<template>
  <div class="flow-meta-well">
    <p-key-value label="Flow ID" :value="flowMeta.id" />

    <p-key-value label="Created">
      <template #value>
        {{ flowMeta.created }}
      </template>
    </p-key-value>

    <p-key-value label="Tags">
      <template #value>
        <p-tag v-for="tag in flowMeta.tags" :key="tag" class="flow-meta-well__tags">
          {{ tag }}
        </p-tag>
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue, PTag } from '@prefecthq/prefect-design'
  import { Flow } from '@/models'

  defineProps<{
    flowMeta: Flow,
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