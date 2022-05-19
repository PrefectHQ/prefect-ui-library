<template>
  <div class="deployment-meta-well">
    <p-key-value label="Deployment ID" :value="deploymentMeta.deploymentId" />
    <p-key-value label="Flow ID" :value="deploymentMeta.flowId" />
    <p-key-value label="Created" :value="deploymentMeta.created" />
    <p-key-value label="Tags">
      <template #value>
        <p-tag v-for="tag in deploymentMeta.tags" :key="tag" class="deployment-meta-well__tags">
          {{ tag }}
        </p-tag>
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue } from '@prefecthq/prefect-design'
  import { DeploymentMeta } from '@/types/meta'

  defineProps<{
    deploymentMeta: DeploymentMeta,
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