<template>
  <p-select v-model="selectedSavedSearch" :options="options" class="flow-runs-filter-select" />
  <p-button @click="open">
    Save Filter
  </p-button>
  <SaveSearchModal :show-modal="showModal" @save="saveFilter" />
</template>

<script setup lang="ts">
  import { showToast } from '@prefecthq/prefect-design'
  import { watch, ref, inject, computed, Ref } from 'vue'
  import { useRouter } from 'vue-router'
  import  SaveSearchModal from '@/components/SaveSearchModal.vue'
  import { useFlowRunFilterFromRoute, useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { flowRunsRouteKey } from '@/router'
  import { createApi } from '@/utilities'


  const router = useRouter()
  const flowRunsRoute =  inject(flowRunsRouteKey)
  const api = createApi({ baseUrl: 'http://localhost:4200/api' })
  const { showModal, open, close } = useShowModal()


  const savedSearches = ref(await api.savedSearches.getSavedSearches({}))
  const { flows, states, tags, deployments }  = useFlowRunFilterFromRoute()

  const saveFilter = async (filterName: string): Promise<void>=> {
    try {
      await api.savedSearches.createSavedSearch({
        name: filterName,
        filters:{
          states: states.value,
          tags: tags.value,
          flows: flows.value,
        },
      })
      savedSearches.value = await api.savedSearches.getSavedSearches({})
      showToast(localization.success.createSavedSearch, 'success')
      selectedSavedSearch.value = filterName
      close()
    } catch (error) {
      console.warn(error)
      showToast(localization.error.createSavedSearch, 'error')
    }
  }


  // delete
  if (savedSearches.value[0]?.id) {
    api.savedSearches.deleteSavedSearch(savedSearches.value[0].id)
  }


  const savedSearchOptions = computed(()=> savedSearches.value.map(search => {
    return { label: search.name, value: search.name }
  }))

  const options: Ref<{ label: string, value: string }[]> = computed(()=> [{ label: 'Default', value: 'default' }, ...savedSearchOptions.value])

  const selectedSavedSearch = ref('default')

  watch(selectedSavedSearch, (value: string)=> {
    const selectedFilter = savedSearches.value.find(filter => filter.name === value)?.filters
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