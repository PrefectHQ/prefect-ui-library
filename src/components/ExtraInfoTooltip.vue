<template>
  <p-tooltip :text="description" avoid-collisions>
    <p-icon icon="InformationCircleIcon" class="extra-info-tooltip__icon" />
    <template #content>
      <slot />
    </template>
  </p-tooltip>
</template>

<script lang="ts" setup>
  defineProps<{
    description?: string,
  }>()
</script>

  <style>
  .extra-info-tooltip__icon { @apply
    cursor-help
  }
</style>