<template>
  <div ref="el">
    <template v-if="visible && deploymentsCount">
      {{ deploymentsCount }}
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useIntersectionObserver, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref } from 'vue'
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

  const visible = ref(false)
  const el = ref<HTMLDivElement>()

  function intersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visible.value = true
        disconnect()
      }
    })
  }

  const { observe, disconnect } = useIntersectionObserver(intersect)

  onMounted(() => {
    observe(el)
  })
</script>