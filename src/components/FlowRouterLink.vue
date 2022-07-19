<template>
  <span v-if="!matched" class="flow-router-link">
    <span v-if="before">{{ before }}</span>
    <router-link class="flow-router-link__anchor" :to="flowRoute(flowId)">
      {{ flowName }}
    </router-link>
    <span v-if="after">{{ after }}</span>
  </span>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { RouterLink, useRoute, useRouter } from 'vue-router'
  import { flowRouteKey } from '@/router/routes'
  import { flowsApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flowId: string,
    before?: string,
    after?: string,
  }>()

  const flowRoute = inject(flowRouteKey)
  const flowsApi = inject(flowsApiKey)
  const route = useRoute()
  const router = useRouter()
  const flowRouteResolved = computed(() => router.resolve(flowRoute(props.flowId)))
  const matched = computed(() => route.matched.some(({ path }) => flowRouteResolved.value.path == path))

  const flowSubscriptionArgs = computed<Parameters<typeof flowsApi.getFlow> | null>(() => !matched.value ? [props.flowId] : null)

  const subscription = useSubscriptionWithDependencies(flowsApi.getFlow, flowSubscriptionArgs)
  const flowName = computed(() => subscription.response?.name ?? '')
</script>

<style>
.flow-router-link__anchor { @apply
  text-prefect-500
}
</style>
