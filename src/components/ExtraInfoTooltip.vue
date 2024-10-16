<template>
  <p-tooltip :text="description" avoid-collisions>
    <p-icon :size="size" icon="InformationCircleIcon" class="extra-info-tooltip__icon" />
    <template #content>
      <slot />
    </template>
  </p-tooltip>
</template>

<script lang="ts" setup>
  defineProps<{
    description?: string,
    size?: 'small' | 'default' | 'large',
  }>()
</script>

  <style>
  .extra-info-tooltip__icon { @apply
    cursor-help
  }
</style>