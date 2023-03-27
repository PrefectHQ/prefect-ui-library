<template>
  <div class="artifact-collections">
    <div class="artifact-collections__filters">
      <ResultsCount :label="localization.info.artifact" :count="artifactsCount" class="artifact-collection-list__results" />
      <SearchInput v-model="searchTerm" :placeholder="localization.info.artifactSearch" :label="localization.info.artifactSearch" class="artifact-collection-list__search" />
      <ArtifactTypeSelect v-model:selected="selectedType" class="artifact-collection-list__type" />
      <ViewModeButtonGroup class="artifact-collections__view-mode-button-group" />
    </div>

    <RowGridLayoutList v-if="artifactsLoaded" :items="artifacts">
      <template #default="{ item }: { item: Artifact }">
        <router-link v-if="item.id" :to="routes.artifactKey(item.id)">
          <ArtifactCard :artifact="item" class="artifact-collections__artifact-card" />
        </router-link>
        <template v-else>
          wtf
        </template>
      </template>

      <template #empty>
        <ArtifactCollectionsEmptyState />
      </template>
    </RowGridLayoutList>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { ArtifactTypeSelect, ResultsCount, SearchInput } from '@/components'
  import ArtifactCard from '@/components/ArtifactCard.vue'
  import ArtifactCollectionsEmptyState from '@/components/ArtifactCollectionsEmptyState.vue'
  import RowGridLayoutList from '@/components/RowGridLayoutList.vue'
  import ViewModeButtonGroup from '@/components/ViewModeButtonGroup.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { ArtifactsFilter, ArtifactType, Artifact } from '@/models'

  const searchTerm = ref('')
  const selectedType = ref<ArtifactType | null>(null)

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const artifactsFilter = computed<ArtifactsFilter>(() => {
    const keyLike = searchTerm.value ? searchTerm.value : undefined
    const type = selectedType.value ? [selectedType.value] : undefined

    return {
      artifacts: {
        keyExists: true,
        keyLike,
        type,
      },
    }
  })

  const artifactsSubscription = useSubscription(api.artifacts.getArtifacts, [artifactsFilter])
  const artifactsCountSubscription = useSubscription(api.artifacts.getArtifactsCount, [artifactsFilter])
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
  md:flex
  gap-2
  justify-end
  items-center
}

.artifact-collections__filters {
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "search"
                       "type"
                       "results"
                       "view-mode";

}

@screen sm {
  .artifact-collections__filters {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas: "search search"
                        "type type"
                        "results results"
                        "  view-mode";
  }
}

.artifact-collections__results { @apply
  mt-2
  md:mt-0
  md:mr-auto
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

.artifact-collections__results {
  grid-area: results;
}

.artifact-collections__view-mode-button-group { @apply
  ml-auto
}

.artifact-collections__artifact-card { @apply
  hover:border-primary
  focus:border-primary
}
</style>