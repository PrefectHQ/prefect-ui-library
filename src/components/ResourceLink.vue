<template>
  <p-link :to="linkToResource">
    <slot v-bind="{ id, name, role, resourceId }" />
  </p-link>
</template>

<script setup lang="ts">
  import { computed, toRefs } from 'vue'
  import { RouteLocationRaw } from 'vue-router'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { WorkspaceEventResource } from '@/models/api/workspaceEvents'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { resource } = toRefs(props)
  const { id, name, role, resourceId } = useWorkspaceEventResource(resource)

  const routes = useWorkspaceRoutes()
  const linkToResource = computed<RouteLocationRaw | undefined>(() => {
    if (!id.value) {
      return undefined
    }
    switch (role.value) {
      case 'work-queue':
        return routes.workQueue(id.value)
      case 'work-pool':
        return name.value ? routes.workPool(name.value) : routes.workPools()
      case 'flow-run':
        return routes.flowRun(id.value)
      case 'automation':
        return routes.automation(id.value)
      case 'flow':
        return routes.flow(id.value)
      case 'deployment':
        return routes.deployment(id.value)
      case 'task-run':
        return routes.taskRun(id.value)
      case 'block-document':
        return routes.block(id.value)
      case 'webhook':
        return routes.webhook(id.value)
      case 'concurrency-limit':
        return routes.concurrencyLimit(id.value)
      case 'artifact-collection':
        return routes.artifactKey(id.value)
      default:
        return undefined
    }
  })
</script>