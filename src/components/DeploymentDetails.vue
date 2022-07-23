<template>
  <div class="deployment-details">
    <p-key-value label="Flow" :alternate="alternate">
      <template #value>
        <FlowIconText :flow-id="deployment.flowId" />
      </template>
    </p-key-value>

    <p-key-value label="Deployment ID" :value="deployment.id" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(deployment.created)" :alternate="alternate" />

    <p-key-value label="Updated" :value="formatDateTimeNumeric(deployment.updated)" :alternate="alternate" />

    <p-key-value label="Tags" :alternate="alternate">
      <template #value>
        <template v-if="deployment.tags?.length">
          <p-tags :tags="deployment.tags" class="deployment-details__tags" />
        </template>
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import FlowIconText from '@/components/FlowIconText.vue'
  import { Deployment } from '@/models/Deployment'

  defineProps<{
    deployment: Deployment,
    alternate?: boolean,
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