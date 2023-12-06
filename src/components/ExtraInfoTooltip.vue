<template>
  <p-tooltip :text="description">
    <p-icon icon="InformationCircleIcon" class="extra-info-tooltip__icon" />
    <template #content>
      <slot />
    </template>
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'

  defineProps<{
    description: string,
  }>()
</script>

  <style>
  .extra-info-tooltip__icon { @apply
    cursor-help
  }
</style>