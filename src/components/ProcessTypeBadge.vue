<template>
  <p-tag class="process-type-badge">
    <p-icon icon="CogIcon" />
    <span>{{ typeLabel }}</span>
  </p-tag>
</template>

<script lang="ts" setup>
  defineProps<{
    typeLabel: string,
  }>()
</script>

<style>
.p-tag.process-type-badge { @apply
  text-xs
  pl-2;
  background-color: var(--p-color-sentiment-neutral);
}
</style>