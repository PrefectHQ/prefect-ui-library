<template>
  <p-tooltip class="workspace-event-description">
    <div class="workspace-event-description__content">
      <p-link :to="routes.event(event.id, event.occurred)">
        {{ event.eventLabel }}
      </p-link>
      <span class="workspace-event-description__event">{{ event.event }}</span>
    </div>

    <template #content>
      <div class="workspace-event-description__tooltip">
        <template v-for="value in values" :key="value">
          <p-link :to="getEventRoute(value)">
            <p-icon-text :icon="getEventIcon(value)">
              {{ getEventText(value) }} {{ value }}
            </p-icon-text>
          </p-link>
        </template>
      </div>
    </template>
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { Icon } from '@prefecthq/prefect-design'
  import { useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useRoute, RouteLocationRaw } from 'vue-router'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { WorkspaceEvent } from '@/models/workspaceEvent'
  import { toggle } from '@/utilities/arrays'
  import { getEventWithPrefixes } from '@/utilities/events'
  import { withQuery } from '@/utilities/routes'

  const props = defineProps<{
    event: WorkspaceEvent,
  }>()

  const routes = useWorkspaceRoutes()
  const route = useRoute()
  const eventsQueryParam = useRouteQueryParam('events', [])
  const values = computed(() => getEventWithPrefixes(props.event.event))

  function getEventIcon(event: string): Icon {
    return eventsQueryParam.value.includes(event) ? 'MinusSmallIcon' : 'PlusSmallIcon'
  }

  function getEventRoute(event: string): RouteLocationRaw {
    const events = toggle(eventsQueryParam.value, event)
    const query = { ...route.query, events }

    return withQuery(routes.events(), query)
  }

  function getEventText(event: string): string {
    return eventsQueryParam.value.includes(event) ? 'Remove' : 'Add'
  }
</script>

<style>
.workspace-event-description { @apply
  w-fit
}

.workspace-event-description__content { @apply
  inline-flex
  flex-col
  items-start
}

.workspace-event-description__label::first-letter { @apply
  capitalize
}

.workspace-event-description__event { @apply
  text-xs
  text-subdued
}

.workspace-event-description__tooltip { @apply
  grid
  grid-cols-1
  gap-1
}
</style>