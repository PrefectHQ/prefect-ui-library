<template>
  <template v-if="deploymentsCount">
    {{ deploymentsCount }}
  </template>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    flowId: string,
  }>()

  const api = useWorkspaceApi()

  const deploymentsCountFilter = computed<Parameters<typeof api.taskRuns.getTaskRunsCount> | null>(() => {
    return [
      {
        flows: {
          id: {
            any_: [props.flowId],
          },
        },
      },
    ]
  })

  const deploymentsCountSubscription = useSubscriptionWithDependencies(api.deployments.getDeploymentsCount, deploymentsCountFilter)
  const deploymentsCount = computed(() => deploymentsCountSubscription.response ?? null)
</script>