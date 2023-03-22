<template>
  <div>
    <div>
      {{ artifactsCount }}
    </div>
    <p-virtual-scroller
      v-if="executed"
      :items="artifacts"
      :item-estimate-height="112"
      class="artifact-timeline"
      @top="fetchFewer"
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
  const artifactsCountSubscription = useSubscription(api.artifacts.getArtifactsCount, [artifactsFilter])

  const artifactsCount = computed(() => artifactsCountSubscription.response ?? 0)
  const artifacts = computed(() => {
    console.log(JSON.parse(JSON.stringify(artifactsSubscription.response ?? [])))
    return artifactsSubscription.response ?? []
  })
  const executed = computed(() => artifactsSubscription.executed)

  const fetchMore = (): void => {
    console.log('fetchMore')
    artifactsFilterOffset.value += artifactsFilterLimit.value

    if (artifactsFilterOffset.value > artifactsCount.value) {
      artifactsFilterOffset.value = artifacts.value.length
    }
  }

  const fetchFewer = (): void => {
    console.log('fetchFewer')
    artifactsFilterOffset.value -= artifactsFilterLimit.value

    if (artifactsFilterOffset.value < 0) {
      artifactsFilterOffset.value = 0
    }
  }
</script>

<style>

</style>