<template>
  <page-heading :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <template #default="{ close }">
          <p-overflow-menu-item label="Copy ID" icon="DocumentDuplicateIcon" @click="close" />
        </template>
      </p-icon-button-menu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { FlowRun, Flow } from '@/models'
  import { flowsRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const flowsRoute = inject(flowsRouteKey)

  const props = defineProps<{
    flowRun: FlowRun,
    flow: Flow,
  }>()

  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [{ text: props.flow.name, to: flowsRoute }, { text: props.flowRun.name ?? '' }])
</script>