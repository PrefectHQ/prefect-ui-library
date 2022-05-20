<template>
  <div class="deployment-meta-well">
    <p-key-value label="Deployment ID" :value="deployment.id" />

    <p-key-value label="Flow ID" :value="deployment.flowId" />

    <p-key-value label="Created">
      <template #value>
        {{ deployment.created }}
      </template>
    </p-key-value>

    <p-key-value label="Tags">
      <template #value>
        <p-tag v-for="tag in deployment.tags" :key="tag" class="deployment-meta-well__tags">
          {{ tag }}
        </p-tag>
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue } from '@prefecthq/prefect-design'
  import { Deployment } from '@/models'

  defineProps<{
    deployment: Deployment,
  }>()
</script>

<style>
  .deployment-meta-well {
    @apply
    flex
    flex-col
    gap-3
  }

  .deployment-meta-well__tags {
    @apply
    mb-1
    mr-1
  }
</style>