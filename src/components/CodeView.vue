<template>
  <p-code class="code-view" multiline>
    {{ value }}
  </p-code>
</template>

<script lang="ts" setup>
  defineProps<{
    value?: string,
  }>()
</script>

<style>
.code-view { @apply
  p-4
}
</style>