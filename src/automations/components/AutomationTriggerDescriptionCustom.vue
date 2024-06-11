<template>
  <div class="automation-trigger-description-custom">
    A custom trigger
  </div>
</template>

<script lang="ts" setup>
  import { AutomationTrigger } from '@/automations/types/triggers'

  defineProps<{
    trigger: AutomationTrigger,
  }>()
</script>

<style>

</style>