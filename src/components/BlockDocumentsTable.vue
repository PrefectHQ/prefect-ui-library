<template>
  <div class="block-documents-table">
    <div class="block-documents-table__search">
      <ResultsCount label="blocks" :count="filtered.length" />
      <SearchInput v-model="searchTerm" placeholder="Search blocks" label="Search blocks" />
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
        <BlockDocumentMenu :block-document="row" size="xs" />
      </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
  import { media, TableColumn } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import BlockDocumentMenu from './BlockDocumentMenu.vue'
  import BlockSchemaCapabilities from './BlockSchemaCapabilities.vue'
  import ResultsCount from './ResultsCount.vue'
  import SearchInput from './SearchInput.vue'
  import { BlockDocument } from '@/models/BlockDocument'
  import { blockRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    blockDocuments: BlockDocument[],
  }>()

  const emits = defineEmits<{
    (event: 'update'): void,
    (event: 'delete', value: string): void,
  }>()

  const blockDocumentRoute = inject(blockRouteKey)
  const searchTerm = ref('')

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

  const filtered = computed(() => {
    if (searchTerm.value.length === 0) {
      return props.blockDocuments
    }

    return props.blockDocuments.filter(filterDeployment)
  })

  function filterDeployment({ name, blockType }: BlockDocument): boolean {
    return `${name} ${blockType.name}`.toLowerCase().includes(searchTerm.value.toLowerCase())
  }

  function clear(): void {
    searchTerm.value = ''
  }
</script>

<style>
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