<template>
  <page-heading class="page-heading-flow-run" :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <template #default="{ close }">
          <p-overflow-menu-item label="Copy ID" @click="copyId(flowRun.id); close()" />
          <p-overflow-menu-item label="Set State" />
          <p-overflow-menu-item label="Delete" />
        </template>
      </p-icon-button-menu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { FlowRun } from '@/models'
  import { flowsRouteKey } from '@/router'
  import { flowsApiKey } from '@/services'
  import { inject } from '@/utilities'
  import { copyId } from '@/utilities/copy'

  const flowsRoute = inject(flowsRouteKey)
  const flowsApi = inject(flowsApiKey)

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const flowSubscription = useSubscription(flowsApi.getFlow, [props.flowRun.flowId])
  const flowName = computed(() => flowSubscription.response?.name ?? '')

  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [{ text: flowName.value, to: flowsRoute() }, { text: props.flowRun.name ?? '' }])
</script>