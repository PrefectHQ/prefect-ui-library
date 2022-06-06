<template>
  <div class="deployment-meta-well">
    <p-key-value label="Deployment ID" :value="deployment.id" :alternate="alternate" />

    <p-key-value label="Flow ID" :value="deployment.flowId" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(deployment.created)" :alternate="alternate" />

    <p-key-value label="Tags" :alternate="alternate">
      <template #value>
        <p-tag v-for="tag in deployment.tags" :key="tag" class="deployment-meta-well__tags">
          {{ tag }}
        </p-tag>
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue, formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { Deployment } from '@/models'

  defineProps<{
    deployment: Deployment,
    alternate?: boolean,
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