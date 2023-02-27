<template>
  <div class="flow-run-results">
    {{ artifacts }}
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { Artifact } from '@/models/Artifact'
  import { ArtifactsFilter } from '@/models/Filters'
  import { FlowRun } from '@/models/FlowRun'
  import { ArtifactSortValues } from '@/types'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const sort = ref<ArtifactSortValues>('UPDATED_DESC')
  const filter = computed<ArtifactsFilter>(() => ({
    sort: sort.value,
  }))

  const api = useWorkspaceApi()
  const artifactsSubscription = useSubscription(api.artifacts.getArtifacts, [filter], { interval: 15000 })
  const artifacts = computed<Artifact[]>(() => artifactsSubscription.response ?? [])
</script>

<style>
.flow-run-logs__search { @apply
  flex
  justify-end
  items-center
  mb-4
  gap-2
}
</style>