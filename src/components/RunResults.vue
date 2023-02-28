<template>
  <div class="run-results">
    <ArtifactList :artifacts="artifacts">
      <template #actions>
        <SearchInput v-model="search" :placeholder="localization.info.artifactSearchPlaceholder" :label="localization.info.artifactSearchPlaceholder" />
        <ArtifactsSort v-model="sort" />
      </template>
    </ArtifactList>

    <template v-if="loaded && !artifacts.length">
      <p-empty-results>
        <template #message>
          {{ localization.info.noResults }}
        </template>

        <template v-if="hasFilters" #actions>
          <p-button size="sm" secondary @click="clear">
            Clear Filters
          </p-button>
        </template>
      </p-empty-results>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import ArtifactList from '@/components/ArtifactList.vue'
  import ArtifactsSort from '@/components/ArtifactsSort.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Artifact } from '@/models/Artifact'
  import { ArtifactsFilter } from '@/models/Filters'
  import { ArtifactSortValues } from '@/types'

  const props = defineProps<{
    filter: ArtifactsFilter,
  }>()

  const search = ref<string>('')
  const sort = ref<ArtifactSortValues>('UPDATED_DESC')
  const filter = computed<ArtifactsFilter>(() => {
    const baseFilter = { ...props.filter }
    baseFilter.artifacts = { ...baseFilter.artifacts, keyLike: search.value }

    return {
      ...baseFilter,
      search: search.value,
      sort: sort.value,
    }
  })

  const hasFilters = computed(() => search.value.length)

  const api = useWorkspaceApi()
  // TODO: add interval
  const artifactsSubscription = useSubscription(api.artifacts.getArtifacts, [filter])
  const artifacts = computed<Artifact[]>(() => artifactsSubscription.response ?? [])
  const loaded = computed<boolean>(() => artifactsSubscription.executed)

  const clear = (): void => {
    search.value = ''
  }
</script>
