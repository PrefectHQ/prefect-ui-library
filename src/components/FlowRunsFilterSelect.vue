<template>
  <p-select v-model="selectedSavedSearch" :options="options" class="flow-runs-filter-select" />
</template>

<script setup lang="ts">
  import { formatDateTimeNumeric, parseDateTimeNumeric } from '@prefecthq/prefect-design'
  import {  useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { previousDay, startOfToday, subDays } from 'date-fns'
  import { preview } from 'vite'
  import { watch, ref, inject, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useFlowRunFilterFromRoute } from '@/compositions'
  import { stateType } from '@/models'
  import { SavedSearchMappedFilter } from '@/models/SavedSearch'
  import { StateType } from '@/models/StateType'
  import { flowRunsRouteKey } from '@/router'
  // import { savedSearchesApiKey, savedSearchesApi } from '@/services/savedSearchesApi'
  import { createApi } from '@/utilities'

  const router = useRouter()
  const flowRunsRoute =  inject(flowRunsRouteKey)
  const api = createApi({ baseUrl: 'http://localhost:4200/api' })


  const savedSearches = await api.savedSearches.getSavedSearches({})
  // console.log('savedSearches', savedSearches)


  //  function filterMapper(filters: SavedSearchFilter) {
  //   filters.value.reduce((previous:SavedSearchFilter, current: SavedSearchFilter) => prev1.value, initalValue)
  //  })


  await api.savedSearches.createSavedSearch({
    name:'completed&',
    filters:[
      {
        object: 'flowRun',
        property: 'states',
        type: '',
        operation: '',
        value: ['completed', 'failed'],
      },
      // {
      //   property: 'flows',
      //   object: 'flowRun',
      //   type: '',
      //   operation: '',
      //   value: ['fc8acbb2-d3b1-4115-91cf-164d97d546a1'],
      // },
    ],
  })

  // delete
  // if (savedSearches[0]?.id) {
  //   api.savedSearches.deleteSavedSearch(savedSearches[0].id)
  // }

  // const flows = useRouteQueryParam('flow', [])
  // const tags = useRouteQueryParam('tag', [])
  // const statesy = useRouteQueryParam('state', [])
  // console.log('flows etc', flows, tags, statesy)
  const { flows }  = useFlowRunFilterFromRoute()
  const { states }  = useFlowRunFilterFromRoute()


  const savedSearchOptions = savedSearches.map(search => {
    return { label: search.name, value: search.name }
  })

  const options: { label: string, value: string }[] = [{ label: 'Default', value: 'default' }, ...savedSearchOptions]

  const selectedSavedSearch = ref('default')
  const selectedFilter = computed(()=>savedSearches.find(filter => filter.name === selectedSavedSearch.value)?.filters ?? { states: [], flows: [] })

  watch(()=> selectedFilter.value.states, (val: StateType[])=> {
          states.value = val
        },
        { deep: true },
  )
  watch(()=> selectedFilter.value.flows, (val: string[])=> {
          console.log('in flow watch', flows)
          flows.value = val
        },
        { deep: true })
</script>

<style>
  .flow-runs-filter-select {
    @apply
    w-48
  }
</style>