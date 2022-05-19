<template>
  <div class="flow-meta-well">
    <p-key-value label="Flow ID" :value="flowId" />
    <p-key-value label="Created" :value="created" />
    <p-key-value label="Tags">
      <template #value>
        <p-tag v-for="tag in tags" :key="tag" class="flow-meta-well__tags">
          {{ tag }}
        </p-tag>
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue, PTag } from '@prefecthq/prefect-design'

  defineProps<{
    flowId: string,
    created: string,
    tags: string[],
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