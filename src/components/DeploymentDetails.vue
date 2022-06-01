<template>
  <div class="deployment-details">
    <p-key-value label="Deployment ID" :value="deployment.id" />
    <p-key-value label="Flow">
      <template #value>
        <FlowIconText :flow-id="deployment.flowId" />
      </template>
    </p-key-value>
    <p-key-value label="Created" :value="formatDateTimeNumeric(deployment.created)" />

    <template v-if="deployment.tags">
      <p-key-value label="Tags">
        <template #value>
          <p-tags :tags="deployment.tags" class="deployment-details__tags" />
        </template>
      </p-key-value>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { Deployment } from '@/models/Deployment'

  defineProps<{
    deployment: Deployment,
  }>()
</script>

<style>
.deployment-details { @apply
  flex
  flex-col
  gap-3
  items-start
}

.deployment-details__tags { @apply
  mt-1
}
</style>