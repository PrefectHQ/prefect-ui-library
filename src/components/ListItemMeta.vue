<template>
  <div class="list-item-meta">
    <slot name="title">
      <span v-if="title">{{ title }}:</span>
    </slot>

    <slot name="content">
      <div class="list-item-meta__content">
        <slot />
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    title?: string,
  }>()
</script>

<style>
.list-item-meta { @apply
  flex
  gap-1
  text-xs
  font-medium
  items-center
  text-foreground
}

.list-item-meta__content { @apply
  flex
  gap-2
  items-baseline
}
</style>