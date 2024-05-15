<template>
  <p-content class="variables-table">
    <p-list-header sticky>
      <ResultsCount v-if="selectedVariables.length == 0" :label="localization.info.variable" :count="variablesCount" />
      <SelectedCount v-else :count="selectedVariables.length" />
      <VariablesDeleteButton
        v-if="can.delete.variable"
        :variable-ids="selectedVariables.map(variable => variable.id)"
        @delete="deleteVariables"
      />
      <template #controls>
        <SearchInput
          v-model="variableLike"
          :placeholder="localization.info.variablesSearch"
          :label="localization.info.variablesSearch"
        />
        <VariableTagsInput v-model:selected="filter.variables.tags.name" class="variables-table__tags-input" />
      </template>

      <template #sort>
        <p-select v-model="filter.sort" :options="variableSortOptions" />
      </template>
    </p-list-header>

    <p-table
      :selected="can.delete.variable ? selectedVariables : undefined"
      :data="variables"
      :columns="columns"
      :column-classes="columnClass"
      @update:selected="selectedVariables = $event"
    >
      <template #name="{ row }">
        <div class="variables-table__name" :title="row.name">
          <VariableLink :variable="row" />
        </div>
      </template>


      <template #value="{ row }">
        <div class="variables-table__value" :title="row.name">
          <p-code-highlight v-if="row.value.length < 64" :text="row.value" lang="json" inline />
          <VariableLink v-else :variable="row" :default-display="defaultDisplay" />
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
            <p-button size="sm" @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
      </template>
    </p-table>

    <p-pager v-if="variables.length" v-model:page="page" :pages="pages" />
  </p-content>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults, TableColumn, ClassValue } from '@prefecthq/prefect-design'
  import { useDebouncedRef, useSubscription } from '@prefecthq/vue-compositions'
  import merge from 'lodash.merge'
  import { computed, ref } from 'vue'
  import { VariablesDeleteButton, VariableMenu, ResultsCount, SearchInput, SelectedCount, VariableTagsInput, VariableEditModal } from '@/components'
  import VariableLink from '@/components/VariableLink.vue'
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

  const { filter, isCustomFilter, clear } = useVariablesFilter(merge({}, props.filter, {
    variables: {
      nameLike: variableLikeDebounced,
      valueLike: variableLikeDebounced,
    },
    offset,
  }))

  const defaultDisplay = 'click to view'

  const columns: TableColumn<Variable>[] = [
    {
      property: 'name',
      label: 'Name',
      width: '192px',
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

  const selectedVariables = ref<Variable[]>([])

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
.variables-table__tags { @apply
  h-6
}

.variables-table__tags-input { @apply
  w-full
  md:w-32
}

.variables-table__action { @apply
  text-right
  max-w-[42px]
}


.variables-table__value-td,
.variables-table__name { @apply
  min-w-0
  max-w-0
  truncate
}


.variables-table__name { @apply
  max-w-[192px]
}
</style>

