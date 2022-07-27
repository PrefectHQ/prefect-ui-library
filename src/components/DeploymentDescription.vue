<template>
  <p>
    {{ description }}
  </p>
</template>

<script lang="ts" setup>
  defineProps<{
    description: string,
  }>()
</script>