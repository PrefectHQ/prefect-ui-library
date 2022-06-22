<template>
  <div class="app">
    <template v-if="!media.lg">
      <PGlobalSidebar class="app__mobile-menu">
        <template #upper-links>
          <p-icon icon="PrefectGradient" class="app__prefect-icon" />
        </template>
        <template #bottom-links>
          <PIcon icon="MenuIcon" class="app__menu-icon" @click="toggle" />
        </template>
      </PGlobalSidebar>
    </template>
    <app-sidebar v-if="showMenu" class="app__sidebar" @click="close" />
    <suspense>
      <router-view />
    </suspense>
  </div>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { computed, provide, ref, watchEffect } from 'vue'
  import { RouterView } from 'vue-router'
  import AppSidebar from './components/AppSidebar.vue'
  import { flowRunsApi, logsApi, taskRunsApi, flowsApi, deploymentsApi, workQueueApi, notificationsApi, blockDocumentsApi } from './services'
  import { deploymentRouteKey, flowRouteKey, flowRunsRouteKey, flowsRouteKey, deploymentsRouteKey, workQueuesRouteKey, settingsRouteKey, workQueueRouteKey, Route, flowRunRouteKey, workQueueCreateRouteKey, editQueueRouteKey, blocksRouteKey, blockCatalogRouteKey, blockRouteKey, blockEditRouteKey, editNotificationRouteKey, blockCatalogCreateRouteKey } from '@/router'
  import { flowRunsApiKey, logsApiKey, taskRunsApiKey, flowsApiKey, deploymentsApiKey, workQueuesApiKey, notificationsApiKey, blockDocumentsApiKey, mocker, blockTypesApiKey, blockSchemasApiKey } from '@/services'

  const emptyRoute = (): Route => ({ path: '/nothing' })

  provide(flowRunsApiKey, flowRunsApi)
  provide(logsApiKey, logsApi)
  provide(taskRunsApiKey, taskRunsApi)
  provide(flowsApiKey, flowsApi)
  provide(deploymentsApiKey, deploymentsApi)
  provide(workQueuesApiKey, workQueueApi)
  provide(notificationsApiKey, notificationsApi)
  provide(flowRouteKey, emptyRoute)
  provide(flowRunRouteKey, emptyRoute)
  provide(flowRunsRouteKey, emptyRoute)
  provide(deploymentRouteKey, emptyRoute)
  provide(flowRunsRouteKey, emptyRoute)
  provide(flowsRouteKey, emptyRoute)
  provide(deploymentsRouteKey, emptyRoute)
  provide(workQueuesRouteKey, emptyRoute)
  provide(settingsRouteKey, emptyRoute)
  provide(workQueueRouteKey, emptyRoute)
  provide(workQueueCreateRouteKey, emptyRoute)
  provide(editQueueRouteKey, emptyRoute)
  provide(editNotificationRouteKey, emptyRoute)
  provide(blocksRouteKey, emptyRoute)
  provide(blockCatalogRouteKey, emptyRoute)
  provide(blockCatalogCreateRouteKey, emptyRoute)
  provide(blockRouteKey, emptyRoute)
  provide(blockEditRouteKey, emptyRoute)
  provide(blockDocumentsApiKey, blockDocumentsApi)
  provide(blockTypesApiKey, mocker.create('blockTypesApi'))
  provide(blockSchemasApiKey, mocker.create('blockSchemasApi'))

  const mobileMenuOpen = ref(false)
  const showMenu = computed(() => media.lg || mobileMenuOpen.value)

  function toggle(): void {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  function close(): void {
    mobileMenuOpen.value = false
  }

  watchEffect(() => document.body.classList.toggle('body-scrolling-disabled', showMenu.value && !media.lg))
</script>

<style>
.body-scrolling-disabled { @apply
  overflow-hidden
}

.app { @apply
  text-slate-900;
}

.app__prefect-icon { @apply
  w-6
  h-6
}

.app__menu-icon { @apply
  text-white
  w-6
  h-6
  cursor-pointer
}

.app__router-view { @apply
  relative
  z-0
}

.app__router-view-fade-enter-active,
.app__router-view-fade-leave-active {
  transition: opacity 0.25s ease;
}

.app__router-view-fade-enter-from,
.app__router-view-fade-leave-to {
  opacity: 0;
}

@screen lg {
  .app {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
  }
}
</style>