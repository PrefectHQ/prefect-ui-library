<template>
  <p-select v-model="selectedFilter" :options="options" class="flow-runs-filter-select" />
</template>

<script setup lang="ts">
  import { formatDateTimeNumeric, parseDateTimeNumeric } from '@prefecthq/prefect-design'
  import {  useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { previousDay, startOfToday, subDays } from 'date-fns'
  import { preview } from 'vite'
  import { watch, ref, inject } from 'vue'
  import { useRouter } from 'vue-router'
  import { useFlowRunFilterFromRoute } from '@/compositions'
  import { stateType } from '@/models'
  import { SavedSearchMappedFilter } from '@/models/SavedSearch'
  import { flowRunsRouteKey } from '@/router'
  // import { savedSearchesApiKey, savedSearchesApi } from '@/services/savedSearchesApi'
  import { createApi } from '@/utilities'

  const router = useRouter()
  const flowRunsRoute =  inject(flowRunsRouteKey)
  const api = createApi({ baseUrl: 'http://localhost:4200/api' })


  const savedSearches = await api.savedSearches.getSavedSearches({})


  //  function filterMapper(filters: SavedSearchFilter) {
  //   filters.value.reduce((previous:SavedSearchFilter, current: SavedSearchFilter) => prev1.value, initalValue)
  //  })


  await api.savedSearches.createSavedSearch({
    name:'failed',
    filters:[
      {
        object: 'flowRun',
        property: 'states',
        type: '',
        operation: '',
        value: ['failed'],
      },
    ],
  })

  if (savedSearches[0]?.id) {
    api.savedSearches.deleteSavedSearch(savedSearches[0].id)
  }

  // const flows = useRouteQueryParam('flow', [])
  // const tags = useRouteQueryParam('tag', [])
  // const statesy = useRouteQueryParam('state', [])
  // console.log('flows etc', flows, tags, statesy)
  const { startDate, endDate, states, deployments, hasFilters, flows, tags, name } = useFlowRunFilterFromRoute()


  const savedSearchOptions = savedSearches.map(search => {
    return { label: search.name, value: search.name }
  })
  console.log('options', savedSearchOptions)
  const options: { label: string, value: string }[] = [{ label: 'One week (default)', value: 'week' }, ...savedSearchOptions]

  const selectedFilter = ref('week')

  watch(selectedFilter, async ()=> {
    await router.push(flowRunsRoute!())
    // states.value = []
    // if (selectedFilter.value === 'week') {
    //   states.value = [...stateType.filter(state => state !== 'scheduled')]
    //   console.log('sates', states.value)
    //   startDate.value = parseDateTimeNumeric(formatDateTimeNumeric(subDays(startOfToday(), 7)))
    //   return
    // }
    // if (selectedFilter.value === 'day') {
    //   startDate.value = parseDateTimeNumeric(formatDateTimeNumeric(subDays(startOfToday(), 1)))
    //   states.value = []
    //   return
    // } if (selectedFilter.value === 'week') {
    //   states.value = []
    //   startDate.value = parseDateTimeNumeric(formatDateTimeNumeric(subDays(startOfToday(), 7)))
    // }
    // const search  = savedSearches.find(search => search.name === selectedFilter.value)
    // console.log('search', search)
    // const filters = search?.filters
    // const statesFilter = filters?.find(filter => filter.property === 'states')
    // console.log('statesFilter', statesFilter?.value, 'states', states.value)
    // states.value = statesFilter?.value
    // console.log('sates2', states.value)
    // const flowsFilter = filters?.find(filter => filter.property === 'flow')
    // flows.value = flowsFilter?.value
  })
</script>

<style>
  .flow-runs-filter-select {
    @apply
    w-48
  }
</style>