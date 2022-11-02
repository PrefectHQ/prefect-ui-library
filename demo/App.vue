<template>
  <div class="max-w-full min-h-full app">
    <template v-if="!media.lg">
      <PGlobalSidebar class="app__mobile-menu">
        <template #upper-links>
          <p-icon icon="PrefectGradient" class="app__prefect-icon" />
          <span class="text-slate-200">Prefect</span>
        </template>
        <template #bottom-links>
          <PIcon icon="MenuIcon" class="app__menu-icon" @click="toggle" />
        </template>
      </PGlobalSidebar>
    </template>
    <ContextSidebar v-if="showMenu" class="app__sidebar" />
    <router-view class="w-full mx-auto py-10 px-6 lg:px-8" />
  </div>
</template>

<script lang="ts" setup>
  import { media, PGlobalSidebar, PIcon } from '@prefecthq/prefect-design'
  import { computed, provide, watchEffect } from 'vue'
  import { RouterView } from 'vue-router'
  import { useWorkspaceApiMock } from './utilities/api'
  import ContextSidebar from '@/demo/components/ContextSidebar.vue'
  import { mobileMenuOpen, toggle } from '@/demo/router/menu'
  import { flowRouteKey, flowRunRouteKey, editDeploymentRouteKey, flowRunsRouteKey, deploymentRouteKey, taskRunRouteKey, flowsRouteKey, deploymentsRouteKey, workQueuesRouteKey, settingsRouteKey, workQueueRouteKey, workQueueCreateRouteKey, editQueueRouteKey, notificationCreateRouteKey, editNotificationRouteKey, blocksRouteKey, flowRunCreateRouteKey, notificationsRouteKey, blockCatalogRouteKey, blockCatalogViewRouteKey, blockCatalogCreateRouteKey, blockRouteKey, blockEditRouteKey, Route } from '@/router'
  import { getAppPermissions, canKey } from '@/types'

  const showMenu = computed(() => media.lg || mobileMenuOpen.value)

  watchEffect(() => document.body.classList.toggle('body-scrolling-disabled', showMenu.value && !media.lg))

  useWorkspaceApiMock()

  const can = getAppPermissions(
    () => true,
  )

  provide(canKey, can)

  const emptyRoute = (): Route => ({ path: '/' })

  provide(flowRouteKey, emptyRoute)
  provide(flowRunRouteKey, emptyRoute)
  provide(editDeploymentRouteKey, emptyRoute)
  provide(flowRunsRouteKey, emptyRoute)
  provide(deploymentRouteKey, emptyRoute)
  provide(taskRunRouteKey, emptyRoute)
  provide(flowsRouteKey, emptyRoute)
  provide(deploymentsRouteKey, emptyRoute)
  provide(workQueuesRouteKey, emptyRoute)
  provide(settingsRouteKey, emptyRoute)
  provide(workQueueRouteKey, emptyRoute)
  provide(workQueueCreateRouteKey, emptyRoute)
  provide(editQueueRouteKey, emptyRoute)
  provide(notificationCreateRouteKey, emptyRoute)
  provide(editNotificationRouteKey, emptyRoute)
  provide(blocksRouteKey, emptyRoute)
  provide(flowRunCreateRouteKey, emptyRoute)
  provide(notificationsRouteKey, emptyRoute)
  provide(blockCatalogRouteKey, emptyRoute)
  provide(blockCatalogViewRouteKey, emptyRoute)
  provide(blockCatalogCreateRouteKey, emptyRoute)
  provide(blockRouteKey, emptyRoute)
  provide(blockEditRouteKey, emptyRoute)
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
  text-slate-200
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