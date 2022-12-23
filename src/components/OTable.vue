<template>
  <div class="o-table">
    <div class="o-table__controls-header">
      <slot name="controls-header">
        <div class="o-table__controls-header__section o-table__controls-header__section-start">
          <slot name="controls-header__start">
            <slot name="controls-header__start-before" />

            <slot name="controls-header__counts">
              <ResultsCount v-if="_selectedRows.length === 0" :label="rowsCountLabel" :count="_data.length" />
              <SelectedCount v-else :count="_selectedRows.length" />
            </slot>

            <slot name="controls-header__start-after" />
          </slot>
        </div>

        <div class="o-table__controls-header__section o-table__controls-header__section-end">
          <slot name="controls__header__end">
            <slot name="controls-header__end-before" />


            <template v-if="!hideSearch">
              <slot name="controls-header__search">
                <SearchInput v-model="search" :disabled="disableSearch" :placeholder="searchPlaceholder" :label="searchLabel" />
              </slot>
            </template>

            <slot name="controls-header__end-after" />
          </slot>
        </div>
      </slot>
    </div>

    <p-table v-bind="attrs" :data="_data" :columns="_columns">
      <template #select-heading>
        <p-checkbox v-if="!noData" v-model="select" :disabled="disableSelect" />
        <span v-else />
      </template>

      <template #actions-heading>
        <span />
      </template>

      <template #select="{ row }">
        <p-checkbox v-model="_selectedRows" :value="row" :disabled="disableSelect" />
      </template>

      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>

      <template #actions="{ row }">
        <div class="o-table__row__actions">
          <slot name="actions" :row="row" />
        </div>
      </template>


      <template #empty-state>
        <p-empty-results>
          <template #message>
            No {{ emptyResultsLabel }}
          </template>
          <template #actions>
            <p-button v-if="!noData" size="sm" secondary @click="clear">
              Clear Filters
            </p-button>
          </template>
        </p-empty-results>
      </template>
    </p-table>


    <slot name="controls__footer">
      <slot name="controls__footer__start" />
      <slot name="controls__footer__end" />
    </slot>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'OTable',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { TableColumn, TableData } from '@prefecthq/prefect-design'
  import { ref, useAttrs, computed } from 'vue'
  import { SearchInput, ResultsCount, SelectedCount } from '@/components'

  export type TableDataFilter = (term: string, row: TableData, index: number, arr: TableData[]) => boolean

  const attrs = useAttrs()

  const props = withDefaults(defineProps<{
    selectedRows?: TableData[],
    columns: TableColumn[],
    data: TableData[],
    emptyResultsLabel?: string,
    searchPlaceholder?: string,
    searchLabel?: string,
    rowsCountLabel?: string,
    disableSelect?: boolean,
    disableSearch?: boolean,
    hideSearch?: boolean,
    hideSelectColumn?: boolean,
    hideActionsColumn?: boolean,
    search?: TableDataFilter,
  }>(), {
    selectedRows: () => [],
    emptyResultsLabel: 'results',
    searchPlaceholder: 'Search',
    searchLabel: 'Search',
    rowsCountLabel: 'row',
    search: (term: string, row: TableData) => {
      const values = Object.values(row).join(' ').toLowerCase()
      return values.includes(term.toLowerCase())
    },
  })

  const emit = defineEmits<{
    (event: 'update:selectedRows', value: TableData[]): void,
  }>()

  const search = ref<string>('')

  const _selectedRows = computed({
    get() {
      return props.disableSelect ? [] : props.selectedRows
    },
    set(value: TableData[]) {
      if (props.disableSelect) {
        return
      }

      emit('update:selectedRows', value)
    },
  })

  const select = computed({
    get() {
      return _selectedRows.value.length === props.data.length
    },
    set(value: boolean) {
      handleRowSelectAll(value)
    },
  })

  const handleRowSelectAll = (value: boolean): void => {
    if (value) {
      _selectedRows.value = props.data
    } else {
      _selectedRows.value = []
    }
  }

  function clear(): void {
    search.value = ''
  }

  // const filteredSlots = computed(() => {
  //   const slots = Object.keys()
  //   return slots.filter((slot) => !slot.startsWith('o-table'))
  // })

  const _columns = computed(() => {
    return [
      {
        label: 'select',
        width: '20px',
        visible: !props.hideSelectColumn,
      },
      ...props.columns,
      {
        label: 'actions',
        width: '42px',
        visible: !props.hideActionsColumn,
      },
    ]
  })

  const _data = computed(() => {
    if (!search.value) {
      return props.data
    }

    return props.data.filter((row, index, arr) => props.search(search.value, row, index, arr))
  })

  const noData = computed(() => {
    return props.data.length === 0 && search.value === ''
  })
</script>

<style>
.o-table__controls-header { @apply
  flex
  justify-between
  items-center
  mb-2
  sticky
  top-0
  bg-white
  bg-opacity-90
  py-2
  z-10
}

.o-table__controls-header__section { @apply
  flex
  gap-2
  items-center
}

.o-table__controls-header__section-start { @apply
  mr-auto
}

.o-table__controls-header__section-end { @apply
  ml-auto
}

.o-table__row__actions { @apply
  justify-end
  items-center
  flex
  gap-2
}
</style>