<template>
  <div class="artifact-timeline">
    <p-timeline
      :items="artifacts"
      :item-estimate-height="112"
      class="artifact-timeline__timeline"
      @bottom="fetchMore"
    >
      <template #content="{ item: artifact }">
        <ArtifactTimelineItemContent
          v-bind="{ artifact }"
          v-model:expanded="expanded"
          :value="artifact.id"
          class="artifact-timeline__content"
        />
      </template>

      <template #date="{ item: artifact }">
        <ArtifactTimelineItemDate
          v-bind="{ artifact }"
          :latest="artifact.id === latestArtifactId"
          :value="artifact.id"
          class="artifact-timeline__date"
        />
      </template>
    </p-timeline>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref, watch, onBeforeMount } from 'vue'
  import ArtifactTimelineItemContent from '@/components/ArtifactTimelineItemContent.vue'
  import ArtifactTimelineItemDate from '@/components/ArtifactTimelineItemDate.vue'
  import { useWorkspaceApi } from '@/compositions'
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

  const artifactsLatestFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        key: [props.artifactKey],
        keyLatest: true,
      },
    }
  })
  const artifactsLatestSubscription = useSubscription(api.artifacts.getArtifacts, [artifactsLatestFilter])
  const latestArtifactId = computed(() => artifactsLatestSubscription.response?.[0].id)

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

  const expanded = ref<string[]>([])
</script>

<style>
.artifact-timeline {
  --p-timeline-item-date-width: 8rem;

  @apply
  border-t
  border-foreground-200
  dark:border-foreground-300
}
</style>