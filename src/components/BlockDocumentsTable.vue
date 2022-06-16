<template>
  <div class="block-documents-table">
    <div class="block-documents-table__filters">
      <ResultsCount label="blocks" :count="filtered.length" class="block-documents-table__results" />
      <SearchInput v-model="searchTerm" placeholder="Search blocks" label="Search blocks" class="block-documents-table__search" />
      <BlockSchemaCapabilitySelect v-model:selected="selectedCapability" class="block-documents-table__capability" />
      <BlockTypeSelect v-model:selected="selectedType" class="block-documents-table__type" />
    </div>
    <p-table :data="filtered" :columns="columns">
      <template #name="{ row }: { row: BlockDocument }">
        <div class="block-documents-table__name-column">
          <img :src="row.blockType.logoUrl" class="block-documents-table__name-img">
          <div class="block-documents-table__name-content">
            <span class="block-documents-table__crumbs">
              {{ row.blockType.name }} /
              <p-link :to="blockDocumentRoute(row.id)">
                {{ row.name }}
              </p-link>
            </span>
            <template v-if="!media.md">
              <BlockSchemaCapabilities :capabilities="row.blockSchema.capabilities" />
            </template>
          </div>
        </div>
      </template>

      <template #capability="{ row }">
        <BlockSchemaCapabilities :capabilities="row.blockSchema.capabilities" />
      </template>

      <template #action-heading>
        <span />
      </template>
      <template #action="{ row }">
        <BlockDocumentMenu :block-document="row" size="xs" @delete="emit('delete')" />
      </template>

      <template #empty-state>
        <PEmptyResults>
          <template #message>
            No blocks
          </template>
          <template #actions>
            <p-button size="sm" secondary @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
      </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
  import { media, TableColumn } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import BlockDocumentMenu from './BlockDocumentMenu.vue'
  import BlockSchemaCapabilities from './BlockSchemaCapabilities.vue'
  import BlockSchemaCapabilitySelect from './BlockSchemaCapabilitySelect.vue'
  import BlockTypeSelect from './BlockTypeSelect.vue'
  import ResultsCount from './ResultsCount.vue'
  import SearchInput from './SearchInput.vue'
  import { BlockSchemaCapability } from '@/models'
  import { BlockDocument } from '@/models/BlockDocument'
  import { blockRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    blockDocuments: BlockDocument[],
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const blockDocumentRoute = inject(blockRouteKey)
  const searchTerm = ref('')
  const selectedCapability = ref<BlockSchemaCapability | null>(null)
  const selectedType = ref<string | null>(null)

  const columns = computed<TableColumn[]>(() => [
    {
      label: 'Name',
      property: 'name',
    },
    {
      label: 'Capability',
      width: '300px',
      visible: media.md,
    },
    {
      label: 'Action',
      width: '0px',
    },
  ])

  const filtered = computed(() => props.blockDocuments.filter(filterDeployment))

  function filterDeployment({ name, blockType, blockSchema }: BlockDocument): boolean {
    const { capabilities: blockSchemaCapabilities } = blockSchema
    const { name: blockTypeName } = blockType

    if (selectedCapability.value && !blockSchemaCapabilities.includes(selectedCapability.value)) {
      return false
    }

    if (selectedType.value && blockTypeName != selectedType.value) {
      return false
    }

    return `${name} ${blockType.name} ${blockSchemaCapabilities.join(' ')}`.toLowerCase().includes(searchTerm.value.toLowerCase())
  }

  function clear(): void {
    searchTerm.value = ''
    selectedCapability.value = null
    selectedType.value = null
  }
</script>

<style>
.block-documents-table__filters { @apply
  grid
  md:flex
  gap-2
  justify-between
  items-center
  mb-4
}

.block-documents-table__filters {
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "search"
                       "capability"
                       "type"
                       "results";

}

@screen sm {
  .block-documents-table__filters {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas: "search     search"
                        "capability type"
                        "results    results";
  }
}

.block-documents-table__results { @apply
  mt-2
  md:mt-0
  md:mr-auto
}

.block-documents-table__search {
  grid-area: search;
}

.block-documents-table__capability {
  grid-area: capability;
}

.block-documents-table__type {
  grid-area: type;
}

.block-documents-table__results {
  grid-area: results;
}

.block-documents-table__name-column { @apply
  flex
  md:items-center
  gap-1
  min-w-max
}

.block-documents-table__name-content { @apply
  grid
  gap-2
  flex-grow
}

.block-documents-table__name-img { @apply
  border-gray-300
  rounded
  border-[1px]
  mr-1
  w-8
  h-8
}
</style>