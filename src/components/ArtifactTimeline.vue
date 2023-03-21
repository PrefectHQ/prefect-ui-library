<template>
  <div class="artifact-timeline">
    {{ artifacts }}
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { ArtifactsFilter } from '@/models/Filters'

  const props = defineProps<{
    artifactKey: string,
  }>()

  const api = useWorkspaceApi()
  const artifactsFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        key: [props.artifactKey],
      },
    }
  })
  const artifactsSubscription = useSubscription(api.artifacts.getArtifacts, [artifactsFilter])
  const artifacts = computed(() => artifactsSubscription.response ?? [])
</script>

<style>

</style>