<template>
  <p-select v-model="selectedFilter" :options="options" class="flow-runs-filter-select" />
</template>

<script setup lang="ts">
  import { formatDateTimeNumeric, parseDateTimeNumeric } from '@prefecthq/prefect-design'
  import {  useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { startOfToday, subDays } from 'date-fns'
  import { watch, ref, inject } from 'vue'
  import { useRouter } from 'vue-router'
  import { useFlowRunFilterFromRoute } from '@/compositions'
  import { stateType } from '@/models'
  import { SavedSearchFilter } from '@/models/api/SavedSearch'
  import { flowRunsRouteKey } from '@/router'
  // import { savedSearchesApiKey, savedSearchesApi } from '@/services/savedSearchesApi'
  import { createApi } from '@/utilities'

  const router = useRouter()
  const flowRunsRoute =  inject(flowRunsRouteKey)
  const api = createApi({ baseUrl: 'http://localhost:4200/api' })


  const savedSearches = await api.savedSearches.getSavedSearches({})
  console.log(savedSearches)

  // const pendingOnly = api.savedSearches.createSavedSearch({
  //   name:'failed&completedOnly',
  //   filters:[
  //     {
  //       object: 'flowRun',
  //       property: 'state',
  //       type: '',
  //       operation: '',
  //       value: 'failed',
  //     }, {
  //       object: 'flowRun',
  //       property: 'state',
  //       type: '',
  //       operation: '',
  //       value: 'failed',
  //     },
  //   ],
  // })

  // const flows = useRouteQueryParam('flow', [])
  // const tags = useRouteQueryParam('tag', [])
  // const statesy = useRouteQueryParam('state', [])
  const { startDate, endDate, states, deployments, flows, tags, name } = useFlowRunFilterFromRoute()
  console.log('flows', flows.value, 'tags', tags.value, 'states', states.value)

  const savedSearchOptions = savedSearches.map(search => {
    return { label: search.name, value: search.filters }
  })
  console.log(savedSearchOptions)
  const options: { label: string, value: string | SavedSearchFilter | undefined }[] = [{ label: 'One week (default)', value: 'week' }, ...savedSearchOptions]

  const selectedFilter = ref('week')

  watch(selectedFilter, async ()=> {
    await router.push(flowRunsRoute!())
    if (selectedFilter.value === 'noScheduled') {
      states.value = [...stateType.filter(state => state !== 'scheduled')]
      startDate.value = parseDateTimeNumeric(formatDateTimeNumeric(subDays(startOfToday(), 7)))
      return
    }
    if (selectedFilter.value === 'day') {
      startDate.value = parseDateTimeNumeric(formatDateTimeNumeric(subDays(startOfToday(), 1)))
      states.value = []
      return
    } if (selectedFilter.value === 'week') {
      states.value = []
      startDate.value = parseDateTimeNumeric(formatDateTimeNumeric(subDays(startOfToday(), 7)))
    }
  })
</script>

<style>
  .flow-runs-filter-select {
    @apply
    w-48
  }
</style>