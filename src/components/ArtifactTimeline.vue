<template>
  <div class="artifact-timeline">
    <p-timeline
      :items="items"
      :item-estimate-height="60"
      item-key="id"
      class="artifact-timeline__timeline"
      @bottom="fetchMore"
    >
      <template #content="{ item }">
        <div class="artifact-timeline__content">
          <template v-if="item.type == 'artifact'">
            <ArtifactTimelineItemContent
              v-model:expanded="expanded"
              :artifact="item.data"
              :value="item.data.id"
            />
          </template>

          <template v-else-if="item.type == 'message'">
            <p-markdown-renderer :text="item.data" />
          </template>
        </div>
      </template>

      <template #date="{ item }">
        <template v-if="item.type == 'artifact'">
          <ArtifactTimelineItemDate
            :artifact="item.data"
            :latest="item.data.id === latestArtifactId"
            class="artifact-timeline__date"
          />
        </template>
      </template>
    </p-timeline>
  </div>
</template>

<script lang="ts" setup>
  import { Icon, TimelineItem } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref, watch, onBeforeMount } from 'vue'
  import ArtifactTimelineItemContent from '@/components/ArtifactTimelineItemContent.vue'
  import ArtifactTimelineItemDate from '@/components/ArtifactTimelineItemDate.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useArtifactCollection } from '@/compositions/useArtifactCollection'
  import { localization } from '@/localization'
  import { Artifact, artifactTypeIconMap } from '@/models'
  import { ArtifactsFilter } from '@/models/Filters'
  import { sortDates } from '@/utilities'

  const ARTIFACTS_DEFAULT_FILTER_LIMIT = 10

  const props = defineProps<{
    artifactKey: string,
  }>()

  const api = useWorkspaceApi()
  const expanded = ref<string[]>([])

  const artifactsFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        key: [props.artifactKey],
      },
      sort: 'CREATED_DESC',
      limit: ARTIFACTS_DEFAULT_FILTER_LIMIT,
    }
  })

  const artifactsFilterOffset = ref(0)
  const artifactsFilterWithOffset = computed<ArtifactsFilter>(() => {
    return {
      ...artifactsFilter.value,
      offset: artifactsFilterOffset.value,
    }
  })

  const { artifactCollection } = useArtifactCollection(props.artifactKey)
  const latestArtifactId = computed(() => artifactCollection.value?.latestId)

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

  const getOffsetArtifacts = async (): Promise<void> => {
    const result = await api.artifacts.getArtifacts(artifactsFilterWithOffset.value)
    const artifactsMap = new Map([...artifacts.value, ...result].map(obj => [obj.id, obj]))
    const sortedArtifacts = [...artifactsMap.values()].sort((objA, objB) => sortDates(objB.created, objA.created))
    artifacts.value = sortedArtifacts
  }

  const getArtifacts = async (): Promise<void> => {
    const result = await api.artifacts.getArtifacts(artifactsFilter.value)
    const artifactsMap = new Map([...artifacts.value, ...result].map(obj => [obj.id, obj]))
    const sortedArtifacts = [...artifactsMap.values()].sort((objA, objB) => sortDates(objB.created, objA.created))
    artifacts.value = sortedArtifacts
  }

  watch(latestArtifactId, (val, oldVal) => {
    if (val && !oldVal) {
      expanded.value = [val]
    } else {
      getArtifacts()
    }
  }, { immediate: true })

  watch(artifactsFilterOffset, getOffsetArtifacts)

  const fetchMore = (): void => {
    if (artifacts.value.length >= artifactsCount.value) {
      return
    }
    artifactsFilterOffset.value += ARTIFACTS_DEFAULT_FILTER_LIMIT
  }

  onBeforeMount(() => {
    getArtifacts()
  })


  type ArtifactTimelineItem = TimelineItem & {
    icon?: Icon,
    id: string,
    data: Artifact | string,
    type: 'artifact' | 'message',
  }
  const items = computed<ArtifactTimelineItem[]>(() => {
    const items: ArtifactTimelineItem[] = []

    let lastType: string

    artifacts.value.forEach((artifact) => {
      if (lastType && lastType !== artifact.type) {
        items.push({
          id: `${artifact.id}-type-change`,
          data: localization.info.artifactTypeChanged(lastType),
          icon: artifactTypeIconMap[artifact.type],
          type: 'message',
        })
      }

      items.push({
        id: artifact.id,
        data: artifact,
        type: 'artifact',
      })

      lastType = artifact.type
    })

    items.push({
      id: `${props.artifactKey}-created`,
      data: localization.info.artifactCreated(props.artifactKey),
      icon: artifactTypeIconMap.default,
      type: 'message',
    })

    return items
  })
</script>

<style>
.artifact-timeline {
  --p-timeline-item-date-width: 8rem;
  --p-timeline-item-gap: 1rem;
  --virtual-scroller-item-gap: 0;


  @apply
  border-t
  border-b
  border-foreground-200
  dark:border-foreground-300
  relative
}
</style>