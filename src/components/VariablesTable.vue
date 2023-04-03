<template>
  <div class="variables-table">
    <p-layout-table sticky>
      <template #header-start>
        <div class="variables-table__header-start">
          <VariablesDeleteButton v-if="can.delete.variable" :variable-ids="selectedVariables" @delete="deleteVariables" />
          <ResultsCount v-if="selectedVariables.length == 0" :label="localization.info.variable" :count="variablesCount" />
          <SelectedCount v-else :count="selectedVariables.length" />
        </div>
      </template>

      <template #header-end>
        <div class="variables-table__header-end">
          <SearchInput v-model="variableLike" :placeholder="localization.info.variablesSearch" :label="localization.info.variablesSearch" />
          <p-select v-model="filter.sort" :options="variableSortOptions" />
          <p-tags-input v-model="filter.variables.tags.name" :empty-message="localization.info.filterByTags" class="variables-table__tags-input" />
        </div>
      </template>

      <p-table :data="variables" :columns="columns" :column-classes="columnClass">
        <template #selection-heading>
          <div class="variables-table__selection">
            <p-checkbox v-if="variables.length" v-model="model" @update:model-value="selectAllVariables" />
          </div>
        </template>

        <template #selection="{ row }">
          <p-checkbox v-model="selectedVariables" :value="row.id" />
        </template>

        <template #name="{ row }">
          <div class="variables-table__name">
            {{ row.name }}
          </div>
        </template>

        <template #updated="{ row }">
          {{ formatDateTimeNumeric(row.updated) }}
        </template>

        <template #tags="{ row }">
          <p-tag-wrapper class="variables-table__tags" :tags="row.tags" justify="left" />
        </template>

        <template #action-heading>
          <span />
        </template>

        <template #action="{ row }">
          <div :key="row.id" class="variables-table__action">
            <VariableMenu :variable="row" size="xs" @delete="refreshSubscriptions" @update="handleUpdate" />
          </div>
        </template>

        <template #empty-state>
          <PEmptyResults>
            <template #message>
              {{ localization.info.noVariables }}
            </template>
            <template v-if="isCustomFilter" #actions>
              <p-button size="sm" secondary @click="clear">
                Clear Filters
              </p-button>
            </template>
          </PEmptyResults>
        </template>
      </p-table>

      <template #footer-end>
        <p-pager v-if="variables.length" v-model:page="page" :pages="pages" />
      </template>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults, CheckboxModel, TableColumn, ClassValue } from '@prefecthq/prefect-design'
  import { useDebouncedRef, useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { VariablesDeleteButton, VariableMenu, ResultsCount, SearchInput, SelectedCount } from '@/components'
  import { useCan, useVariablesFilter, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { VariablesFilter, Variable } from '@/models'
  import { variableSortOptions } from '@/types'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const DEFAULT_LIMIT = 25

  const props = defineProps<{
    filter?: VariablesFilter,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()

  const variableLike = ref<string>()
  const variableLikeDebounced = useDebouncedRef(variableLike, 1000)

  const page = ref(1)
  const offset = computed(() => {
    return (page.value - 1) * DEFAULT_LIMIT
  })
  const pages = computed(() => Math.ceil((variablesCount.value ?? DEFAULT_LIMIT) / DEFAULT_LIMIT))

  const { filter, isCustomFilter, clear } = useVariablesFilter({
    ...props.filter,
    variables: {
      ...props.filter?.variables,
      nameLike: variableLikeDebounced,
      valueLike: variableLikeDebounced,
    },
    offset,
  })

  const columns = [
    {
      label: 'selection',
      width: '20px',
      visible: can.delete.variable,
    },
    {
      property: 'name',
      label: 'Name',
      width: '124px',
    },
    {
      property: 'value',
      label: 'Value',
    },
    {
      property: 'updated',
      label: 'Updated',
      width: '124px',
    },
    {
      property: 'tags',
      label: 'Tags',
      width: '248px',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

  function columnClass(column: TableColumn): ClassValue {
    return {
      'variables-table__value-td': column.label === 'Value',
    }
  }

  const selectedVariables = ref<string[]>([])
  const selectAllVariables = (allVariablesSelected: CheckboxModel): string[] => {
    if (allVariablesSelected) {
      return selectedVariables.value = [...variables.value.map(variable => variable.id)]
    }
    return selectedVariables.value = []
  }

  const model = computed({
    get() {
      return selectedVariables.value.length === variables.value.length
    },
    set(value: boolean) {
      selectAllVariables(value)
    },
  })

  const variablesSubscription = useSubscription(api.variables.getVariables, [filter])
  const variables = computed(() => variablesSubscription.response ?? [])

  const variablesCountSubscription = useSubscription(api.variables.getVariablesCount, [filter])
  const variablesCount = computed(() => variablesCountSubscription.response)

  function refreshSubscriptions(): void {
    variablesSubscription.refresh()
    variablesCountSubscription.refresh()
  }

  defineExpose({
    refreshSubscriptions,
  })

  const emit = defineEmits<{
    (event: 'delete'): void,
    (event: 'update', value: Variable): void,
  }>()

  const deleteVariables = (): void => {
    selectedVariables.value = []
    refreshSubscriptions()
    emit('delete')
  }

  const handleUpdate = (variable: Variable): void => {
    emit('update', variable)
  }
</script>

<style>
.variables-table__header-start { @apply
  grow
  whitespace-nowrap
  gap-2
  flex
  items-center
  justify-start
}

.variables-table__header-end { @apply
  flex
  flex-wrap
  pl-2
  ml-auto
  shrink
  gap-2
}

.variables-table__tags { @apply
  h-6
}

.variables-table__tags-input { @apply
  w-32
}

.variables-table__action { @apply
  text-right
  max-w-[42px]
}

.variables-table__selection { @apply
  max-w-[20px]
}

.variables-table__name { @apply
  min-w-0
  max-w-[124px]
  truncate
}

.variables-table__value-td { @apply
  min-w-0
  max-w-[124px]
  truncate
}
</style>
