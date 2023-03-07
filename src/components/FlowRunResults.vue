<template>
  <div class="flow-run-results">
    {{ results }}
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { ArtifactsFilter, useWorkspaceApi } from '..'
  import { FlowRun } from '@/models'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const api = useWorkspaceApi()
  const resultsFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        flowRunId: [props.flowRun.id],
      },
    }
  })
  const resultsSubscription = useSubscription(api.artifacts.getArtifacts, [resultsFilter])
  const results = computed(() => resultsSubscription.response ?? [])
</script>

<style>

</style>