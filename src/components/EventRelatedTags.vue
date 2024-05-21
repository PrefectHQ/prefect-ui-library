<template>
  <div class="event-related-tags">
    Tags
    <template v-for="(resource, index) in resources" :key="index">
      <p-tooltip>
        <p-tag>{{ getTagLabel(resource) }}</p-tag>

        <template #content>
          <p-link :to="getTagFilterRoute(resource)">
            <p-icon-text :icon="getTagFilterIcon(resource)">
              {{ getTagFilterLabel(resource) }}
            </p-icon-text>
          </p-link>
        </template>
      </p-tooltip>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@prefecthq/prefect-design'
  import { useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { RouteLocationRaw, useRoute } from 'vue-router'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { localization } from '@/localization'
  import { WorkspaceEventResource } from '@/models/workspaceEvent'
  import { toggle } from '@/utilities/arrays'
  import { withQuery } from '@/utilities/routes'

  defineProps<{
    resources: WorkspaceEventResource[],
  }>()

  const route = useRoute()
  const routes = useWorkspaceRoutes()
  const relatedResources = useRouteQueryParam('resource', [])

  function getTagLabel(resource: WorkspaceEventResource): string {
    return resource['prefect.resource.id'].split('.').at(-1)!
  }

  function getTagFilterRoute(resource: WorkspaceEventResource): RouteLocationRaw {
    const related = toggle(relatedResources.value, resource['prefect.resource.id'])
    const query = { ...route.query, 'resource': related }

    return withQuery(routes.events(), query)
  }

  function getTagFilterIcon(resource: WorkspaceEventResource): Icon {
    const filterExists = relatedResources.value.includes(resource['prefect.resource.id'])

    return filterExists ? 'MinusSmallIcon' : 'PlusSmallIcon'
  }

  function getTagFilterLabel(resource: WorkspaceEventResource): string {
    const filterExists = relatedResources.value.includes(resource['prefect.resource.id'])

    return filterExists ? localization.info.removeTagFromFilter : localization.info.filterByTag
  }
</script>

<style>
.event-related-tags { @apply
  flex
  flex-wrap
  gap-2
  items-center
}
</style>