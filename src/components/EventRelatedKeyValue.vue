<template>
  <p-key-value label="Related Resources" class="event-related-key-value" v-bind="{ alternate }">
    <template v-if="hasRelatedResources" #value>
      <div class="event-related-key-value__resources" :class="classes.resources">
        <template v-for="(resource, index) in related.resources" :key="index">
          <EventResourceIconText :resource="resource" />
        </template>

        <template v-if="related.tags.length">
          <EventRelatedTags :resources="related.tags" />
        </template>
      </div>
    </template>
  </p-key-value>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import EventRelatedTags from '@/components/EventRelatedTags.vue'
  import { useComponent } from '@/compositions/useComponent'
  import { WorkspaceEvent } from '@/models/workspaceEvent'
  import { separate } from '@/utilities/arrays'
  import { getResourceIdParts } from '@/utilities/events'

  const props = defineProps<{
    event: WorkspaceEvent,
    alternate?: boolean,
  }>()

  const { EventResourceIconText } = useComponent()

  const hasRelatedResources = computed(() => props.event.related.length > 0 ? true : null)
  const classes = computed(() => ({
    resources: {
      'event-related-key-value__resources--alternate': props.alternate,
    },
  }))

  const related = computed(() => {
    const [tags, resources] = separate(props.event.related, resource => {
      const { role } = getResourceIdParts(resource['prefect.resource.id'])

      return role === 'tag'
    })

    return {
      tags,
      resources,
    }
  })
</script>

<style>
.event-related-key-value__resources { @apply
  grid
}

.event-related-key-value__resources--alternate { @apply
  flex
  flex-wrap
  items-center
  gap-x-3
  gap-y-2
}
</style>