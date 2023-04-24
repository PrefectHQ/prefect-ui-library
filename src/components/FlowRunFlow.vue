<template>
  <div class="flow-run-flow">
    <span>{{ localization.info.flow }}</span> <FlowIconText :flow-id="flowId" />
  </div>
</template>

<script lang="ts" setup>
  import FlowIconText from '@/components/FlowIconText.vue'
  import { localization } from '@/localization'

  defineProps<{
    flowId: string,
  }>()
</script>

<style>
.flow-run-flow { @apply
  flex gap-1
}
</style>