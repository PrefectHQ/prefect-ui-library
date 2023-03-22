<template>
  <div>
    <ResultsCount
      :count="artifactsCount"
      :label="localization.info.artifact"
    />

    <p-virtual-scroller
      :items="artifacts"
      :item-estimate-height="112"
      class="artifact-timeline"
      @bottom="fetchMore"
    >
      <template #default="{ item: artifact, index }">
        <p-heading heading="3">
          {{ index }} - {{ artifact.id }}
        </p-heading>
        <ArtifactTimelineItem v-bind="{ artifact }" />
      </template>
    </p-virtual-scroller>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref, watch, onBeforeMount } from 'vue'
  import ArtifactTimelineItem from '@/components/ArtifactTimelineItem.vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Artifact } from '@/models'
  import { ArtifactsFilter } from '@/models/Filters'

  const ARTIFACTS_DEFAULT_FILTER_LIMIT = 10

  const props = defineProps<{
    artifactKey: string,
  }>()

  const api = useWorkspaceApi()
  const artifactsFilterOffset = ref(0)
  const artifactsFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        key: [props.artifactKey],
      },
      sort: 'CREATED_DESC',
      offset: artifactsFilterOffset.value,
      limit: ARTIFACTS_DEFAULT_FILTER_LIMIT,
    }
  })

  const artifactsCountFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        key: [props.artifactKey],
      },
    }
  })
  const artifactsCountSubscription = useSubscription(api.artifacts.getArtifactsCount, [artifactsCountFilter])
  const artifactsCount = computed(() => artifactsCountSubscription.response ?? 0)

  const artifacts = ref<Artifact[]>([])

  const getArtifacts = async (): Promise<void> => {
    const result = await api.artifacts.getArtifacts(artifactsFilter.value)
    artifacts.value = [...artifacts.value, ...result]
  }

  watch(artifactsFilterOffset, getArtifacts)

  const fetchMore = (): void => {
    if (artifacts.value.length >= artifactsCount.value) {
      return
    }
    artifactsFilterOffset.value += ARTIFACTS_DEFAULT_FILTER_LIMIT
  }

  onBeforeMount(() => {
    getArtifacts()
  })
</script>

<style>

</style>