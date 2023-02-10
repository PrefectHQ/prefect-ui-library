<template>
  <div class="collections-list">
    <div class="collections-list__filters">
      <ResultsCount label="Flow" :count="filteredCollectionFlows.length" class="collections-list__results" />
      <SearchInput v-model="searchTerm" class="collections-list__search" placeholder="Search collections" />
    </div>

    <div class="collections-list__types">
      <template v-for="collectionFlow in filteredCollectionFlows" :key="collectionFlow.name">
        <CollectionCardPreview :collection-item="collectionFlow" />
      </template>
    </div>

    <p-empty-results v-if="empty">
      <template #message>
        No collections
      </template>
      <template #actions>
        <p-button size="sm" secondary @click="clear">
          Clear Filters
        </p-button>
      </template>
    </p-empty-results>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import CollectionCardPreview from '@/components/CollectionCardPreview.vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import { CollectionItem } from '@/models'
  import { collectionsApi } from '@/services'

  const searchTerm = ref('')

  const collectionSubscription = useSubscription(collectionsApi.getFlowCollection, [])
  const collectionFlows = computed(() => collectionSubscription.response ?? [])
  const filteredCollectionFlows = computed(() => collectionFlows.value.filter(filterByName))
  const empty = computed(() => collectionSubscription.executed && collectionFlows.value.length === 0)

  function filterByName({ name }: CollectionItem): boolean {
    return name.toLowerCase().includes(searchTerm.value.toLowerCase())
  }

  function clear(): void {
    searchTerm.value = ''
  }
</script>

<style>
.collections-list { @apply
  grid
  gap-4
}

.collections-list__filters { @apply
  grid
  md:flex
  gap-2
  items-center
}

.collections-list__filters {
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "search"
                       "results";
}

.collections-list__results { @apply
  mt-2
  md:mt-0
  md:mr-auto
}

.collections-list__results {
  grid-area: results;
}

.collections-list__search {
  grid-area: search;
}

.collections-list__types { @apply
  grid
  md:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-2
}

.collections-list__add { @apply
  w-full
}
</style>