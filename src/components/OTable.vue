<template>
  <div class="o-table">
    <div class="o-table__controls-header">
      <slot name="controls-header">
        <div class="o-table__controls__section o-table__controls__section--start">
          <slot name="controls-header__start">
            <slot name="controls-header__start--before" />

            <slot name="controls-header__counts">
              <ResultsCount v-if="internalSelectedRows.length === 0" :label="label" :count="data.length" />
              <SelectedCount v-else :count="internalSelectedRows.length" />
            </slot>

            <slot name="controls-header__start--after" />
          </slot>
        </div>

        <div class="o-table__controls__section o-table__controls__section--end">
          <slot name="controls-header__end">
            <slot name="controls-header__end--before" />


            <template v-if="!hideSearch">
              <slot name="controls-header__search">
                <SearchInput v-model="internalSearch" :disabled="disableSearch" :placeholder="searchPlaceholder" :label="label" />
              </slot>
            </template>

            <slot name="controls-header__end--after" />
          </slot>
        </div>
      </slot>
    </div>

    <p-table v-bind="attrs" :data="data" :columns="internalColumns">
      <template #select-heading>
        <p-checkbox v-if="!noData" v-model="select" :disabled="disableSelect" />
        <span v-else />
      </template>

      <template #actions-heading>
        <span />
      </template>

      <template #select="{ row }">
        <p-checkbox v-model="internalSelectedRows" :value="row" :disabled="disableSelect" />
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
            No {{ pluralize(label) }}
          </template>
          <template #actions>
            <p-button v-if="!noData" size="sm" secondary @click="clear">
              Clear Filters
            </p-button>
          </template>
        </p-empty-results>
      </template>
    </p-table>

    <div class="o-table__controls-footer">
      <slot name="controls-footer">
        <div class="o-table__controls__section o-table__controls__section--start">
          <slot name="controls-footer__start" />
        </div>

        <div class="o-table__controls__section o-table__controls__section--end">
          <slot name="controls-footer__end" />
        </div>
      </slot>
    </div>
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
  import { useAttrs, computed } from 'vue'
  import { SearchInput, ResultsCount, SelectedCount } from '@/components'
  import { pluralize } from '@/utilities'

  export type TableDataFilter = (term: string, row: TableData, index: number, arr: TableData[]) => boolean

  const attrs = useAttrs()

  const props = withDefaults(defineProps<{
    search: string,
    selectedRows?: TableData[],
    columns: TableColumn[],
    data: TableData[],
    label?: string,
    searchPlaceholder?: string,
    disableSelect?: boolean,
    disableSearch?: boolean,
    hideSearch?: boolean,
    hideSelectColumn?: boolean,
    hideActionsColumn?: boolean,
  }>(), {
    selectedRows: () => [],
    label: 'result',
    searchPlaceholder: 'Search',
  })

  const emit = defineEmits<{
    (event: 'update:search', value: string): void,
    (event: 'clear'): void,
    (event: 'update:selectedRows', value: TableData[]): void,
  }>()

  const internalSearch = computed<string>({
    get() {
      return props.search
    },
    set(value: string) {
      emit('update:search', value)
    },
  })

  const internalSelectedRows = computed({
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
      return internalSelectedRows.value.length === props.data.length
    },
    set(value: boolean) {
      handleRowSelectAll(value)
    },
  })

  const handleRowSelectAll = (value: boolean): void => {
    if (value) {
      internalSelectedRows.value = props.data
    } else {
      internalSelectedRows.value = []
    }
  }

  function clear(): void {
    internalSearch.value = ''
    emit('clear')
  }

  const internalColumns = computed(() => {
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

  const noData = computed(() => {
    return props.data.length === 0 && internalSearch.value === ''
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

.o-table__controls-footer { @apply
  flex
  justify-between
  items-center
  mt-2
  bg-white
  bg-opacity-90
  py-2
  z-10
}

.o-table__controls__section { @apply
  flex
  gap-2
  items-center
}

.o-table__controls__section--start { @apply
  mr-auto
}

.o-table__controls__section--end { @apply
  ml-auto
}

.o-table__row__actions { @apply
  justify-end
  items-center
  flex
  gap-2
}
</style>