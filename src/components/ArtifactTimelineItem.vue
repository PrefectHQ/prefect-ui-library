<template>
  <div class="artifact-timeline">
    {{ artifactKey }}
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    artifactKey: string,
  }>()
</script>

<style>

</style>