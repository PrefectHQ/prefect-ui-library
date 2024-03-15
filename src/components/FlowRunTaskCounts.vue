<template>
  <span v-if="counts" class="flow-run-task-counts">
    ({{ counts }})
  </span>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { TaskRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const api = useWorkspaceApi()
  const filter = computed<TaskRunsFilter>(() => ({
    flowRuns: {
      id: [props.flowRunId],
    },
  }))

  const subscription = useSubscription(api.ui.getTaskRunsCountByState, [filter], { interval: 30000 })
  const counts = computed(() => {
    if (!subscription.response) {
      return ''
    }

    return Object.entries(subscription.response).reduce<string[]>((response, [key, value]) => {
      if (!value) {
        return response
      }

      response.push(`${value} ${key}`)

      return response
    }, []).join(', ')
  })
</script>

<style>
.flow-run-task-counts { @apply
  text-subdued
  text-xs
  capitalize
}
</style>