<template>
  <p-content class="block-documents-table">
    <p-list-header sticky>
      <ResultsCount v-if="selectedBlockDocuments.length ===0" label="Block" :count="total" />
      <SelectedCount v-else :count="selectedBlockDocuments.length" />
      <BlocksDeleteButton v-if="selectedBlockDocuments.length > 0" class="block-documents-table__delete" :selected="selectedBlockDocuments.map(blockDocument => blockDocument.id)" size="sm" @delete="onDelete" />

      <template #controls>
        <SearchInput v-model="searchTerm" placeholder="Search blocks" label="Search blocks" class="block-documents-table__search" />
        <BlockSchemaCapabilitySelect v-model:selected="capabilities" class="block-documents-table__capability" />
        <BlockTypeSelect v-model:selected="blockTypes" class="block-documents-table__type" />
      </template>
    </p-list-header>

    <p-table
      class="block-documents-table__table"
      :data="blockDocumentRows"
      :columns="columns"
      :selected="selectedBlockDocuments"
      :column-classes="columnClasses"
      @update:selected="selectedBlockDocuments = $event"
    >
      <template #type="{ row }">
        <div class="block-documents-table__name-column">
          <LogoImage :url="row.blockType.logoUrl" class="block-documents-table__logo" />
        </div>
      </template>

      <template #block="{ row }">
        <div class="block-documents-table__block">
          <LogoImage :url="row.blockType.logoUrl" class="block-documents-table__logo" />

          <div class="block-documents-table__content">
            <router-link :to="routes.block(row.id)" class="block-documents-table__block-name">
              {{ row.name }}
            </router-link>

            <router-link :to="routes.blocksCatalogView(row.blockType.slug)" class="block-documents-table__block-type">
              {{ row.blockType.name }}
            </router-link>
          </div>
        </div>
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <BlockDocumentMenu :block-document="row" small @delete="onDelete" />
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

    <p-pager v-model:limit="limit" v-model:page="page" :pages="pages" />
  </p-content>
</template>

<script lang="ts" setup>
  import { TableColumn, PEmptyResults, ClassValue } from '@prefecthq/prefect-design'
  import { NumberRouteParam, useDebouncedRef, useLocalStorage, useRouteQueryParam } from '@prefecthq/vue-compositions'
  import merge from 'lodash.merge'
  import { computed, ref, ComputedRef } from 'vue'
  import { snakeCase } from '..'
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

  const columnClasses = (column: TableColumn<BlockDocument>): ClassValue => [`deployment-list__${snakeCase(column.label)}-column`]
  const columns = computed<TableColumn<BlockDocument>[]>(() => [
    {
      label: 'Block',
    },
    {
      label: 'Action',
      width: '64px',
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
.block-documents-table .p-table__table { @apply
  table-fixed
  w-full
}

.block-documents-table__action-column,
.block-documents-table__table .p-table__checkbox-cell { @apply
  box-content
}

.block-documents-table__block { @apply
  flex
  gap-3
  items-center
}

.block-documents-table__content { @apply
  flex
  flex-col
  gap-0.5
  min-w-0
  max-w-full
}

.block-documents-table__block-type,
.block-documents-table__block-name { @apply
  max-w-full
  truncate
  hover:underline
}

.block-documents-table__block-name { @apply
  font-semibold
  text-base
}


.block-documents-table__block-type { @apply
  text-subdued
  text-xs
}
</style>