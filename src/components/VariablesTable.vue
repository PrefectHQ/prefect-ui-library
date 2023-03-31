<template>
  <div class="variables-table">
    <p-layout-table sticky>
      <template #header-start>
        <div class="variables-table__header-start">
          <ResultsCount v-if="selectedVariables.length == 0" :label="localization.info.variable" :count="variablesCount" />
          <SelectedCount v-else :count="selectedVariables.length" />

          <FlowsDeleteButton v-if="can.delete.variable" :selected="selectedVariables" @delete="deleteVariables" />
        </div>
      </template>

      <template #header-end>
        <div class="variables-table__header-end">
          <SearchInput v-model="variableLike" :placeholder="localization.info.variablesSearch" :label="localization.info.variablesSearch" />
          <p-select v-model="filter.sort" :options="variableSortOptions" />
          <p-tags-input v-model="filter.variables.tags.name" :empty-message="localization.info.tags" class="variables-table__tags" />
        </div>
      </template>

      <p-table :data="variables" :columns="columns">
        <template #selection-heading>
          <p-checkbox v-if="variables.length" v-model="model" @update:model-value="selectAllVariables" />
          <div v-else />
        </template>

        <template #selection="{ row }">
          <p-checkbox v-model="selectedVariables" :value="row.id" />
        </template>

        <template #name="{ row }">
          <span>{{ row.name }}</span>
        </template>

        <template #updated="{ row }">
          {{ formatDateTimeNumeric(row.updated) }}
        </template>

        <template #tags="{ row }">
          <p-tags :tags="row.tags" />
        </template>

        <template #action-heading>
          <span />
        </template>

        <template #action="{ row }">
          <div class="variables-table__action">
            <VariableMenu :variable="row" size="xs" @delete="refreshSubscriptions" />
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
        <p-pager v-if="variables.length" v-model:page="offset" :pages="variablesCount" />
      </template>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults, CheckboxModel } from '@prefecthq/prefect-design'
  import { useDebouncedRef, useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { FlowsDeleteButton, VariableMenu, ResultsCount, SearchInput, SelectedCount } from '@/components'
  import { useCan, useVariablesFilter, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { VariablesFilter } from '@/models/Filters'
  import { variableSortOptions } from '@/types'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    filter?: VariablesFilter,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()

  const variableLike = ref<string>()
  const variableLikeDebounced = useDebouncedRef(variableLike, 1000)
  const offset = ref(0)

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
      width: '64px',
    },
    {
      property: 'value',
      label: 'Value',
      width: '124px',
    },
    {
      property: 'updated',
      label: 'Updated',
      width: '124px',
    },
    {
      property: 'tags',
      label: 'Tags',
      width: '124px',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

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
  }>()

  const deleteVariables = (): void => {
    selectedVariables.value = []
    refreshSubscriptions()
    emit('delete')
  }
</script>

<style>
.variables-table__header-start { @apply
  grow
  whitespace-nowrap
}

.variables-table__header-end { @apply
  flex
  flex-wrap
  pl-2
  ml-auto
  shrink
  gap-2
}

.variables-table__tags {
  min-width: 128px;
}

.variables-table__action { @apply
  text-right
}
</style>
