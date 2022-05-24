<template>
  <div class="app">
    <app-sidebar />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
  import { provide } from 'vue'
  import { RouteLocationRaw } from 'vue-router'
  import AppSidebar from './components/AppSidebar.vue'
  import ContextSidebarSection from './sections/ContextSidebarSection.vue'
  import EmptyStateSection from './sections/EmptyStateSection.vue'
  import ListsSection from './sections/ListsSection.vue'
  import LogSection from './sections/LogsSection.vue'
  import MetaWellSection from './sections/MetaWellSection.vue'
  import SortSection from './sections/SortSections.vue'
  import StatesSection from './sections/StatesSection.vue'
  import { flowRunsApi, logsApi, taskRunsApi, flowsApi, deploymentsApi,  workQueueApi } from './services'
  import { deploymentRouteKey, flowRouteKey, flowRunsRouteKey, flowsRouteKey, deploymentsRouteKey, queuesRouteKey, settingsRouteKey, workQueueRouteKey } from '@/router'
  import { flowRunsApiKey, logsApiKey, taskRunsApiKey, flowsApiKey, deploymentsApiKey, workQueuesApiKey } from '@/services'

  const emptyRoute = (): RouteLocationRaw => ({ path: '/' })

  provide(flowRunsApiKey, flowRunsApi)
  provide(logsApiKey, logsApi)
  provide(taskRunsApiKey, taskRunsApi)
  provide(flowsApiKey, flowsApi)
  provide(deploymentsApiKey, deploymentsApi)
  provide(workQueuesApiKey, workQueueApi)
  provide(flowRouteKey, emptyRoute)
  provide(deploymentRouteKey, emptyRoute)
  provide(flowRunsRouteKey, emptyRoute)
  provide(flowsRouteKey, emptyRoute)
  provide(deploymentsRouteKey, emptyRoute)
  provide(queuesRouteKey, emptyRoute)
  provide(settingsRouteKey, emptyRoute)
  provide(workQueueRouteKey, emptyRoute)
</script>

<style>
.app { @apply
  max-w-full
  min-h-full;

  display: grid;
  grid-template-columns: 256px minmax(0, 1fr);
}
</style>