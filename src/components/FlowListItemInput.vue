<template>
  <div class="flow-list-item-input" />
</template>

<script lang="ts" setup>
  import { Flow } from '@/models/Flow'

  defineProps<{
    flow: Flow,
  }>()
</script>

<style>

</style>