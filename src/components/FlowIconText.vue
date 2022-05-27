<template>
  <router-link :to="flowRoute(flowId)" class="flow-icon-text">
    <p-icon-text icon="Flow">
      <span>{{ flowName }}</span>
    </p-icon-text>
  </router-link>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { flowRouteKey } from '@/router/routes'
  import { flowsApiKey } from '@/services/FlowsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flowId: string,
    flowName?: string,
  }>()

  const flowRoute = inject(flowRouteKey)

  const flowsApi = inject(flowsApiKey)
  const flowsSubscription = props.flowName ?? useSubscription(flowsApi.getFlow, [props.flowId])
  const flowName = computed(() => {
    if (typeof flowsSubscription === 'string') {
      return props.flowName
    }

    return flowsSubscription.response?.name
  })
</script>