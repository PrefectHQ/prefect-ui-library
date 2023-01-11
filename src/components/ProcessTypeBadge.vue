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
.process-type-badge { @apply
  text-xs
  pl-2
  bg-slate-300
  text-slate-700
}
</style>