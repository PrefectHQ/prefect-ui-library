<template>
  <div class="flow-details">
    <p-key-value label="Flow ID" :value="flow.id" :alternate="alternate" />


    <p-key-value label="Created" :alternate="alternate">
      <template #value>
        <FormattedDate :date="flow.created" format="numeric" />
      </template>
    </p-key-value>

    <p-key-value label="Updated" :alternate="alternate">
      <template #value>
        <FormattedDate :date="flow.updated" format="numeric" />
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import FormattedDate from '@/components/FormattedDate.vue'
  import { Flow } from '@/models/Flow'

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
