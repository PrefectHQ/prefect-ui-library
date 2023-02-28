<template>
  <div class="run-results">
    <template v-if="loaded && artifacts.length">
      <ArtifactList :artifacts="artifacts" />
    </template>

    <template v-else-if="loaded && !artifacts.length">
      <p class="run-results__no-results">
        {{ localization.info.noResults }}
      </p>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import ArtifactList from '@/components/ArtifactList.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Artifact } from '@/models/Artifact'
  import { ArtifactsFilter } from '@/models/Filters'
  import { ArtifactSortValues } from '@/types'

  const props = defineProps<{
    filter: ArtifactsFilter,
  }>()

  const sort = ref<ArtifactSortValues>('UPDATED_DESC')
  const filter = computed<ArtifactsFilter>(() => ({
    ...props.filter,
    sort: sort.value,
  }))

  const api = useWorkspaceApi()
  // TODO: add interval
  const artifactsSubscription = useSubscription(api.artifacts.getArtifacts, [filter])
  const artifacts = computed<Artifact[]>(() => artifactsSubscription.response ?? [])
  const loaded = computed<boolean>(() => artifactsSubscription.executed)
</script>
