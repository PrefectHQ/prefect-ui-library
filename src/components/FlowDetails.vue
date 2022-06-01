<template>
  <div class="flow-details">
    <p-key-value label="Flow ID" :value="flow.id" />
    <p-key-value label="Created" :value="formatDateTimeNumeric(flow.created)" />

    <template v-if="flow.tags.length">
      <p-key-value label="Tags">
        <template #value>
          <p-tags :tags="flow.tags" class="flow-details__tags" />
        </template>
      </p-key-value>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { Flow } from '@/models/Flow'

  defineProps<{
    flow: Flow,
  }>()
</script>

<style>
.flow-details { @apply
  flex
  flex-col
  gap-3
  items-start
}

.flow-details__tags { @apply
  mt-1
}
</style>