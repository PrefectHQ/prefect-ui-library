<template>
  <p-markdown-renderer :text="description" />
</template>

<script lang="ts" setup>
  defineProps<{
    description: string,
  }>()
</script>