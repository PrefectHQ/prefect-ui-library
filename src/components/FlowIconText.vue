<template>
  <template v-if="can.read.flow">
    <router-link :to="flowRoute(flowId)" class="flow-icon-text">
      <p-icon-text icon="Flow">
        <span>{{ flowName }}</span>
      </p-icon-text>
    </router-link>
  </template>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useCan } from '@/compositions/useCan'
  import { flowRouteKey } from '@/router/routes'
  import { flowsApiKey } from '@/services/FlowsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flowId: string,
  }>()

  const can = useCan()
  const flowRoute = inject(flowRouteKey)
  const flowsApi = inject(flowsApiKey)
  const flowSubscriptionArgs = computed<[string] | null>(() => {
    if (!can.read.flow) {
      return null
    }

    return [props.flowId]
  })
  const flowsSubscription =  useSubscriptionWithDependencies(flowsApi.getFlow, flowSubscriptionArgs)
  const flowName = computed(() => flowsSubscription.response?.name)
</script>