<template>
  <div class="block-documents-table">
    <div class="block-documents-table__filters">
      <span class="block-documents-table__results">
        <ResultsCount v-if="selectedBlockDocuments.length ===0" label="Block" :count="total" />
        <SelectedCount v-else :count="selectedBlockDocuments.length" />
        <BlocksDeleteButton v-if="selectedBlockDocuments.length > 0" class="block-documents-table__delete" :selected="selectedBlockDocuments.map(blockDocument => blockDocument.id)" size="sm" @delete="onDelete" />
      </span>
      <SearchInput v-model="searchTerm" placeholder="Search blocks" label="Search blocks" class="block-documents-table__search" />
      <BlockSchemaCapabilitySelect v-model:selected="capabilities" class="block-documents-table__capability" />
      <BlockTypeSelect v-model:selected="blockTypes" class="block-documents-table__type" />
    </div>
    <p-table :data="blockDocumentRows" :columns="columns" :selected="selectedBlockDocuments" @update:selected="selectedBlockDocuments = $event">
      <template #name="{ row }">
        <div class="block-documents-table__name-column">
          <LogoImage :url="row.blockType.logoUrl" class="block-documents-table__name-img" />
          <div class="block-documents-table__name-content">
            <span class="block-documents-table__crumbs">
              {{ row.blockType.name }} /
              <p-link :to="routes.block(row.id)">
                {{ row.name }}
              </p-link>
            </span>
            <template v-if="!media.md">
              <BlockSchemaCapabilities :capabilities="row.blockSchema.capabilities" />
            </template>
          </div>
        </div>
      </template>

      <template #capabilities="{ row }">
        <BlockSchemaCapabilities :capabilities="row.blockSchema.capabilities" wrapper />
      </template>

      <template #action-heading>
        <span />
      </template>
      <template #action="{ row }">
        <BlockDocumentMenu :block-document="row" size="xs" @delete="onDelete" />
      </template>

      <template #empty-state>
        <PEmptyResults v-if="subscriptions.executed">
          <template #message>
            No blocks
          </template>
          <template #actions>
            <p-button size="sm" @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
        <PEmptyResults v-else>
          <template #message>
            <p-loading-icon />
          </template>
        </PEmptyResults>
      </template>
    </p-table>

    <p-pager v-if="pages > 1" v-model:limit="limit" v-model:page="page" :pages="pages" />
  </div>
</template>

<script lang="ts" setup>
  import { media, TableColumn, PEmptyResults } from '@prefecthq/prefect-design'
  import { NumberRouteParam, useDebouncedRef, useLocalStorage, useRouteQueryParam } from '@prefecthq/vue-compositions'
  import merge from 'lodash.merge'
  import { computed, ref, ComputedRef } from 'vue'
  import BlockSchemaCapabilities from '@/components/BlockSchemaCapabilities.vue'
  import BlockSchemaCapabilitySelect from '@/components/BlockSchemaCapabilitySelect.vue'
  import BlocksDeleteButton from '@/components/BlocksDeleteButton.vue'
  import BlockTypeSelect from '@/components/BlockTypeSelect.vue'
  import LogoImage from '@/components/LogoImage.vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import SelectedCount from '@/components/SelectedCount.vue'
  import { useBlockDocuments, useBlockDocumentsFilterFromRoute, useComponent, useWorkspaceRoutes } from '@/compositions'
  import { BlockDocument } from '@/models/BlockDocument'
  import { BlockDocumentsFilter } from '@/models/Filters'

  const props = defineProps<{
    filter?: BlockDocumentsFilter,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const { BlockDocumentMenu } = useComponent()
  const routes = useWorkspaceRoutes()

  const columns = computed<TableColumn<BlockDocument>[]>(() => [

    {
      label: 'Name',
      property: 'name',
      width: '300px',
    },
    {
      label: 'Capabilities',
      visible: media.md,
    },
    {
      label: 'Action',
      width: '0px',
    },
  ])

  const page = useRouteQueryParam('page', NumberRouteParam, 1)
  const capabilities = ref<string[]>([])
  const blockTypes = ref<string[]>([])
  const searchTerm = ref('')
  const searchTermDebounced = useDebouncedRef(searchTerm, 500)

  const { value: limit } = useLocalStorage('block-documents-table-limit', 10)

  const { filter: routeFilter } = useBlockDocumentsFilterFromRoute({
    blockSchemas: {
      blockCapabilities: capabilities,
    },
    blockDocuments: {
      nameLike: searchTermDebounced,
    },
    blockTypes: {
      slug: blockTypes,
    },
    limit,
    sort: 'BLOCK_TYPE_AND_NAME_ASC',
  })

  const { blockDocuments, total, pages, subscriptions } = useBlockDocuments(() => merge({}, props.filter, routeFilter), {
    page,
  })

  type BlockDocumentRow = BlockDocument & { disabled?: boolean }
  const blockDocumentRows: ComputedRef<BlockDocumentRow[]> = computed(() => blockDocuments.value.map((blockDocument: BlockDocumentRow) => {
    if (!blockDocument.can.delete) {
      blockDocument.disabled = true
    }
    return blockDocument
  },
  ))

  function clear(): void {
    searchTerm.value = ''
    capabilities.value = []
    blockTypes.value = []
  }

  const selectedBlockDocuments = ref<BlockDocumentRow[]>([])


  function onDelete(): void {
    selectedBlockDocuments.value = []
    subscriptions.refresh()
    emit('delete')
  }
</script>

<style>
.block-documents-table { @apply
  grid
  gap-4
}

.block-documents-table__filters { @apply
  grid
  md:flex
  gap-2
  justify-between
  items-center
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

.block-documents-table__delete { @apply
  ml-2
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
  mr-1
}
</style>