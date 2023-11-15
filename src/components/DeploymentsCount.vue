<template>
  <template v-if="deploymentsCount">
    <span class="deployments-count">{{ deploymentsCount }} {{ toPluralString(localization.info.deployment, deploymentsCount) }}</span>
  </template>
  <template v-else>
    <span class="deployments-count--none">{{ localization.info.none }}</span>
  </template>
</template>

<script lang="ts" setup>
  import { toPluralString } from '@prefecthq/prefect-design'
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'

  const props = defineProps<{
    flowId: string,
  }>()

  const api = useWorkspaceApi()

  const deploymentsCountFilter = computed<Parameters<typeof api.deployments.getDeploymentsCount> | null>(() => {
    return [
      {
        flows: {
          id: [props.flowId],
        },
      },
    ]
  })

  const deploymentsCountSubscription = useSubscriptionWithDependencies(api.deployments.getDeploymentsCount, deploymentsCountFilter)
  const deploymentsCount = computed(() => deploymentsCountSubscription.response ?? null)
</script>

<style>
.deployments-count--none { @apply
  text-subdued
}
</style>