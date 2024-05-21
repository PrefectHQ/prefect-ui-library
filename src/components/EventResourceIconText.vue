<template>
  <p-tooltip :disabled="!filterRoute">
    <div class="event-resource-icon-text">
      <template v-if="component">
        <component :is="component" :resource="resource" class="event-resource-icon-text__component" />
      </template>
      <template v-else>
        <span>{{ resourceId }}</span>
      </template>
    </div>

    <template #content>
      <p-link v-if="filterRoute" :to="filterRoute">
        <p-icon-text :icon="filterIcon">
          {{ filterText }}
        </p-icon-text>
      </p-link>
    </template>
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import EventResourceAutomationIconText from '@/components/EventResourceAutomationIconText.vue'
  import EventResourceBlockDocumentIconText from '@/components/EventResourceBlockDocumentIconText.vue'
  import EventResourceConcurrencyLimitIconText from '@/components/EventResourceConcurrencyLimitIconText.vue'
  import EventResourceDeploymentIconText from '@/components/EventResourceDeploymentIconText.vue'
  import EventResourceFlowIconText from '@/components/EventResourceFlowIconText.vue'
  import EventResourceFlowRunIconText from '@/components/EventResourceFlowRunIconText.vue'
  import EventResourceTaskRunIconText from '@/components/EventResourceTaskRunIconText.vue'
  import EventResourceWebhookIconText from '@/components/EventResourceWebhookIconText.vue'
  import EventResourceWorkPoolIconText from '@/components/EventResourceWorkPoolIconText.vue'
  import EventResourceWorkQueueIconText from '@/components/EventResourceWorkQueueIconText.vue'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { localization } from '@/localization'
  import { WorkspaceEventResource } from '@/models/api/workspaceEvents'
  import { toggle } from '@/utilities/arrays'
  import { isRecord } from '@/utilities/object'
  import { withQuery } from '@/utilities/routes'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()
  const { resource } = toRefs(props)
  const { role, resourceId } = useWorkspaceEventResource(resource)
  const relatedResources = useRouteQueryParam('related-resources', [])

  const component = computed(() => {
    switch (role.value) {
      case 'work-queue':
        return EventResourceWorkQueueIconText
      case 'work-pool':
        return EventResourceWorkPoolIconText
      case 'flow-run':
        return EventResourceFlowRunIconText
      case 'automation':
        return EventResourceAutomationIconText
      case 'flow':
        return EventResourceFlowIconText
      case 'deployment':
        return EventResourceDeploymentIconText
      case 'task-run':
        return EventResourceTaskRunIconText
      case 'block-document':
        return EventResourceBlockDocumentIconText
      case 'webhook':
        return EventResourceWebhookIconText
      case 'concurrency-limit':
        return EventResourceConcurrencyLimitIconText
      default:
        return null
    }
  })

  const filterIncludesResource = computed(() => relatedResources.value.includes(resourceId.value))
  const filterIcon = computed(() => filterIncludesResource.value ? 'MinusSmallIcon' : 'PlusSmallIcon')
  const filterText = computed(() => filterIncludesResource.value ? localization.info.removeResourceFromFilter : localization.info.filterByResource)

  const routes = useWorkspaceRoutes()
  const router = useRouter()
  const route = useRoute()
  const filterRoute = computed(() => {
    const resource = toggle(relatedResources.value, resourceId.value)
    const query = { ...route.query, resource }
    const routeLocation = withQuery(routes.events(), query)

    // Some audit log events do not have a workspace id
    // So OrganizationAuditLogEvent.vue may provide a routes object that is missing the workspace param
    try {
      const url = router.resolve(routeLocation)

      return url
    } catch (error) {
      if (isRecord(error) && error.message === 'Missing required param "workspaceId"') {
        return
      }

      console.error(error)
    }

    return null
  })
</script>

<style>
.event-resource-icon-text__component { @apply
  flex
  items-center
  gap-1
}
</style>