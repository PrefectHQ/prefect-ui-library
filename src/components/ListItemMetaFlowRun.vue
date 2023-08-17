<template>
  <ListItemMeta class="list-item-meta-flow-run" :title="title">
    <template v-if="flowRun">
      <FlowRunIconText :flow-run-id="flowRun.id" />
      <StateBadge :state="flowRun.state" />
    </template>
    <template v-else>
      <span class="list-item-meta-flow-run__none">{{ localization.info.none }}</span>
    </template>
  </ListItemMeta>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { ListItemMeta, FlowRunIconText, StateBadge } from '@/components'
  import { localization } from '@/localization'
  import { FlowRun } from '@/models'

  const props = defineProps<{
    title?: string,
    flowRun?: FlowRun,
  }>()

  const title = computed(() => props.title ?? localization.info.flowRun)
</script>

<style>
.list-item-meta-flow-run__none { @apply
  text-subdued
}
</style>