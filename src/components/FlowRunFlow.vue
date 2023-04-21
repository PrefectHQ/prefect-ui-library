<template>
  <div class="flow-run-flow">
    <span>{{ localization.info.flow }}</span> <FlowIconText :flow-id="flowId" />
  </div>
</template>

<script lang="ts" setup>
  import WorkPoolIconText from '@/components/FlowIconText.vue'
  import { localization } from '@/localization'

  defineProps<{
    flowId: string,
  }>()
</script>
