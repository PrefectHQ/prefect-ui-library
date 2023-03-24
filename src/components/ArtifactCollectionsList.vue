<template>
  <div class="artifact-collections-list">
    <div class="artifact-collections-list__filters">
      <ResultsCount :label="localization.info.artifact" :count="artifactsCount" class="artifact-collection-list__results" />
      <SearchInput v-model="searchTerm" :placeholder="localization.info.artifactSearch" :label="localization.info.artifactSearch" class="artifact-collection-list__search" />
      <ArtifactTypeSelect v-model:selected="selectedType" class="artifact-collection-list__type" />
      <ViewModeButtonGroup />
    </div>

    <template v-if="artifactsCountSubscription.executed && artifactsCount == 0">
      <ArtifactCollectionsEmptyState />
    </template>
    <template v-else-if="artifactsCount">
      hello :)
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { ArtifactTypeSelect } from '@/components'
  import ArtifactCollectionsEmptyState from '@/components/ArtifactCollectionsEmptyState.vue'
  import ViewModeButtonGroup from '@/components/ViewModeButtonGroup.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { ArtifactsFilter, ArtifactType } from '@/models'

  const searchTerm = ref('')
  const selectedType = ref<ArtifactType | null>(null)

  const api = useWorkspaceApi()

  const artifactsFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        keyExists: true,
      },
    }
  })

  const artifactsSubscription = useSubscription(api.artifacts.getArtifacts, [artifactsFilter])
  const artifactsCountSubscription = useSubscription(api.artifacts.getArtifactsCount, [artifactsFilter])
  const artifacts = computed(() => artifactsSubscription.response)
  const artifactsCount = computed(() => artifactsCountSubscription.response)
</script>