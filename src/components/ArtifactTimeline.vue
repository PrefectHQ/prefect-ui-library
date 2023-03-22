<template>
  <p-virtual-scroller v-if="executed" :items="artifacts" :item-estimate-height="112" class="artifact-timeline" @bottom="fetchMore">
    <template #default="{ item: artifact, index }">
      <p-heading heading="3">
        {{ index }} - {{ artifact.id }}
      </p-heading>
      <ArtifactTimelineItem v-bind="{ artifact }" />
    </template>
  </p-virtual-scroller>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import ArtifactTimelineItem from '@/components/ArtifactTimelineItem.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { ArtifactsFilter } from '@/models/Filters'

  const props = defineProps<{
    artifactKey: string,
  }>()

  const api = useWorkspaceApi()
  const artifactsFilterOffset = ref(0)
  const artifactsFilterLimit = ref(10)
  const artifactsFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        key: [props.artifactKey],
      },
      sort: 'CREATED_DESC',
      offset: artifactsFilterOffset.value,
      limit: artifactsFilterLimit.value,
    }
  })
  const artifactsSubscription = useSubscription(api.artifacts.getArtifacts, [artifactsFilter])
  const artifacts = computed(() => {
    console.log(JSON.parse(JSON.stringify(artifactsSubscription.response ?? [])))
    return artifactsSubscription.response ?? []
  })
  const executed = computed(() => artifactsSubscription.executed)

  const fetchMore = (): void => {
    console.log('fetchMore')
    artifactsFilterOffset.value += artifactsFilterLimit.value
  }
</script>

<style>

</style>