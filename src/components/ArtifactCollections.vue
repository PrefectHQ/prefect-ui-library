<template>
  <div class="artifact-collections">
    <div class="artifact-collections__filters">
      <ResultsCount :label="localization.info.artifact" :count="artifactsCount" class="artifact-collections__results" />
      <SearchInput v-model="searchTerm" :placeholder="localization.info.artifactSearch" :label="localization.info.artifactSearch" class="artifact-collections__search" />
      <ArtifactTypeSelect v-model:selected="selectedType" class="artifact-collections__type" />
      <ViewModeButtonGroup class="artifact-collections__view-mode" />
    </div>

    <RowGridLayoutList v-if="artifactsLoaded" :items="artifacts">
      <template #default="{ item }: { item: ArtifactCollection }">
        <router-link :to="routes.artifactKey(item.key)">
          <ArtifactCard :artifact="item" interactive>
            <template #summary-label>
              {{ localization.info.lastUpdated }}
            </template>
            <template #summary-value>
              {{ formatDateTime(item.updated) }}
            </template>
          </ArtifactCard>
        </router-link>
      </template>

      <template #empty>
        <ArtifactCollectionsEmptyState />
      </template>
    </RowGridLayoutList>
  </div>
</template>

<script lang="ts" setup>
  import { useDebouncedRef, useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { ArtifactTypeSelect, ResultsCount, SearchInput } from '@/components'
  import ArtifactCard from '@/components/ArtifactCard.vue'
  import ArtifactCollectionsEmptyState from '@/components/ArtifactCollectionsEmptyState.vue'
  import RowGridLayoutList from '@/components/RowGridLayoutList.vue'
  import ViewModeButtonGroup from '@/components/ViewModeButtonGroup.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { ArtifactsFilter, ArtifactType, ArtifactCollection } from '@/models'
  import { formatDateTime } from '@/utilities'

  const searchTerm = ref<string>('')
  const searchTermDebounced = useDebouncedRef(searchTerm, 1200)

  const selectedType = ref<ArtifactType | null>(null)

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const artifactsFilter = computed<ArtifactsFilter>(() => {
    const keyLike = searchTermDebounced.value ? searchTermDebounced.value : undefined
    const keyExists = true
    const type = selectedType.value ? [selectedType.value] : undefined

    return {
      artifacts: {
        keyExists,
        keyLike,
        type,
      },
    }
  })

  const artifactsSubscription = useSubscription(api.artifacts.getArtifactCollections, [artifactsFilter])
  const artifactsCountSubscription = useSubscription(api.artifacts.getArtifactCollectionsCount, [artifactsFilter])
  const artifactsLoaded = computed(() => artifactsSubscription.executed)
  const artifacts = computed(() => artifactsSubscription.response ?? [])
  const artifactsCount = computed(() => artifactsCountSubscription.response)
</script>

<style>
.artifact-collections { @apply
  grid
  gap-4
}

.artifact-collections__filters { @apply
  grid
  items-center
  gap-2
}

.artifact-collections__filters {
  /* grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "results"
                       "search"
                       "type"
                       "view-mode"; */

  grid-template-areas: "search search"
                        "type type"
                        "results view-mode";
  grid-template-columns: 1fr min-content

}

@screen md {
  .artifact-collections__filters {
    /* grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas: "search search"
                        "type type"
                        "results view-mode"
                        "  "; */

    grid-template-areas: "results search type view-mode";
    grid-template-columns: 1fr max-content min-content min-content;
  }
}

.artifact-collections__results {
  grid-area: results;
}

.artifact-collections__search {
  grid-area: search;
}

.artifact-collections__view-mode {
  grid-area: view-mode;
}

.artifact-collections__type {
  grid-area: type;
}
</style>