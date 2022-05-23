<template>
  <div class="p-10">
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Orion Design
        </h2>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <a href="https://github.com/PrefectHQ/orion-design" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Github
        </a>
      </div>
    </div>

    <StatesSection />
    <LogSection />
    <EmptyStateSection />
    <ContextSidebarSection />
    <ListsSection />
    <MetaWellSection />
  </div>
</template>

<script lang="ts" setup>
  import { provide } from 'vue'
  import { RouteLocationRaw } from 'vue-router'
  import ContextSidebarSection from './sections/ContextSidebarSection.vue'
  import EmptyStateSection from './sections/EmptyStateSection.vue'
  import ListsSection from './sections/ListsSection.vue'
  import LogSection from './sections/LogsSection.vue'
  import MetaWellSection from './sections/MetaWellSection.vue'
  import StatesSection from './sections/StatesSection.vue'
  import { flowRunsApi, logsApi, taskRunsApi, flowsApi, deploymentsApi } from './services'
  import { deploymentRouteKey, flowRouteKey, flowRunsRouteKey, flowsRouteKey, deploymentsRouteKey, queuesRouteKey, settingsRouteKey } from '@/router'
  import { flowRunsApiKey, logsApiKey, taskRunsApiKey, flowsApiKey, deploymentsApiKey } from '@/services'

  const emptyRoute = (): RouteLocationRaw => ({ path: '/nothing' })

  provide(flowRunsApiKey, flowRunsApi)
  provide(logsApiKey, logsApi)
  provide(taskRunsApiKey, taskRunsApi)
  provide(flowsApiKey, flowsApi)
  provide(deploymentsApiKey, deploymentsApi)
  provide(flowRouteKey, emptyRoute)
  provide(deploymentRouteKey, emptyRoute)
  provide(flowRunsRouteKey, emptyRoute)
  provide(flowsRouteKey, emptyRoute)
  provide(deploymentsRouteKey, emptyRoute)
  provide(queuesRouteKey, emptyRoute)
  provide(settingsRouteKey, emptyRoute)
</script>
