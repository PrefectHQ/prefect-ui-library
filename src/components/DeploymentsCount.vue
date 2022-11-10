<template>
  <div ref="element">
    <template v-if="visible && deploymentsCount">
      {{ deploymentsCount }}
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useVisibilityObserver, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    flowId: string,
  }>()

  const api = useWorkspaceApi()
  const element = ref<HTMLDivElement>()
  const { visible } = useVisibilityObserver(element, { disconnectWhenVisible: true })

  const deploymentsCountFilter = computed<Parameters<typeof api.deployments.getDeploymentsCount> | null>(() => {
    if (!visible.value) {
      return null
    }

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