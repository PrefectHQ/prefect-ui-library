<template>
  <p-select v-model="selectedSavedSearch" :options="options" class="flow-runs-filter-select" />
</template>

<script setup lang="ts">
  import { watch, ref, inject } from 'vue'
  import { useRouter } from 'vue-router'
  import { useFlowRunFilterFromRoute } from '@/compositions'
  import { flowRunsRouteKey } from '@/router'


  import { createApi } from '@/utilities'
  import { deploymentsApi } from 'demo/services'

  const router = useRouter()
  const flowRunsRoute =  inject(flowRunsRouteKey)
  const api = createApi({ baseUrl: 'http://localhost:4200/api' })

  const savedSearches = await api.savedSearches.getSavedSearches({})

  // create
  await api.savedSearches.createSavedSearch({
    name:'completed&failed&bb',
    filters:{
      states: ['failed', 'completed'],
      tags: ['bb'],
    },
  })

  // delete
  // if (savedSearches[0]?.id) {
  //   api.savedSearches.deleteSavedSearch(savedSearches[0].id)
  // }

  const { flows, states, tags, deployments }  = useFlowRunFilterFromRoute()

  const savedSearchOptions = savedSearches.map(search => {
    return { label: search.name, value: search.name }
  })

  const options: { label: string, value: string }[] = [{ label: 'Default', value: 'default' }, ...savedSearchOptions]

  const selectedSavedSearch = ref('default')

  watch(selectedSavedSearch, (value: string)=> {
    const selectedFilter = savedSearches.find(filter => filter.name === value)?.filters
    if (selectedFilter) {
      flows.value = selectedFilter.flows ?? []
      states.value = selectedFilter.states?? []
      tags.value = selectedFilter.tags ?? []
      deployments.value = selectedFilter.deployments ?? []
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