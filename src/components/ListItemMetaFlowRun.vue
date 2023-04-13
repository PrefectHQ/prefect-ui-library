<template>
  <div class="list-item-meta-flow-run">
    <span>{{ title ?? localization.info.flowRun }}:</span>
    <div class="list-item-meta-flow-run__content">
      <FlowRunIconText :flow-run-id="flowRun.id" />
      <StateBadge :state="flowRun.state" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { FlowRunIconText, StateBadge } from '@/components'
  import { localization } from '@/localization'
  import { FlowRun } from '@/models'

  defineProps<{
    title?: string,
    flowRun: FlowRun,
  }>()
</script>

<style>
.list-item-meta-flow-run { @apply
  flex
  gap-1
  text-xs
  font-bold
}

.list-item-meta-flow-run__content { @apply
  flex
  flex-col
  gap-1
  items-start
}
</style>