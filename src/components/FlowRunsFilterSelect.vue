<template>
  <p-select v-model="selectedSavedSearch" :options="options" class="flow-runs-filter-select" />
</template>

<script setup lang="ts">
  import { watch, ref, inject } from 'vue'
  import { useRouter } from 'vue-router'
  import { useFlowRunFilterFromRoute } from '@/compositions'
  import { flowRunsRouteKey } from '@/router'


  import { createApi } from '@/utilities'

  const router = useRouter()
  const flowRunsRoute =  inject(flowRunsRouteKey)
  const api = createApi({ baseUrl: 'http://localhost:4200/api' })

  const savedSearches = await api.savedSearches.getSavedSearches({})

  // create
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
      {
        property: 'flows',
        object: 'flowRun',
        type: '',
        operation: '',
        value: ['fc8acbb2-d3b1-4115-91cf-164d97d546a1'],
      },
    ],
  })

  // delete
  // if (savedSearches[0]?.id) {
  //   api.savedSearches.deleteSavedSearch(savedSearches[0].id)
  // }

  const { flows, states }  = useFlowRunFilterFromRoute()

  const savedSearchOptions = savedSearches.map(search => {
    return { label: search.name, value: search.name }
  })

  const options: { label: string, value: string }[] = [{ label: 'Default', value: 'default' }, ...savedSearchOptions]

  const selectedSavedSearch = ref('default')

  watch(selectedSavedSearch, (value: string)=> {
    const selectedFilter = savedSearches.find(filter => filter.name === value)?.filters
    if (selectedFilter) {
      flows.value = selectedFilter.flows
      states.value = selectedFilter.states
      return
    }
    router.push(flowRunsRoute!())
  })
</script>

<style>
  .flow-runs-filter-select {
    @apply
    w-48
  }
</style>