<template>
  <div class="app">
    <app-sidebar />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
  import { provide } from 'vue'
  import AppSidebar from './components/AppSidebar.vue'
  import { flowRunsApi, logsApi, taskRunsApi, flowsApi, deploymentsApi, workQueueApi } from './services'
  import { deploymentRouteKey, flowRouteKey, flowRunsRouteKey, flowsRouteKey, deploymentsRouteKey, queuesRouteKey, settingsRouteKey, workQueueRouteKey, Route, flowRunRouteKey } from '@/router'
  import { flowRunsApiKey, logsApiKey, taskRunsApiKey, flowsApiKey, deploymentsApiKey, workQueuesApiKey } from '@/services'

  const emptyRoute = (): Route => ({ path: '/nothing' })

  provide(flowRunsApiKey, flowRunsApi)
  provide(logsApiKey, logsApi)
  provide(taskRunsApiKey, taskRunsApi)
  provide(flowsApiKey, flowsApi)
  provide(deploymentsApiKey, deploymentsApi)
  provide(workQueuesApiKey, workQueueApi)
  provide(flowRouteKey, emptyRoute)
  provide(flowRunRouteKey, emptyRoute)
  provide(flowRunsRouteKey, emptyRoute)
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
  min-h-full
  grid
  grid-cols-1
  sm:grid-cols-[256px_minmax(0,_1fr)]
}
</style>