<template>
  <p-card class="workspace-events-timeline-content" :class="classes.root" :flat="!expanded">
    <div class="workspace-events-timeline-content__container" :class="classes.container">
      <header class="workspace-events-timeline-container__header">
        <WorkspaceEventDescription :event="event" />
        <EventResourceKeyValue class="workspace-events-list-item__resource" :event="event" alternate />
        <template v-if="event.related.length">
          <EventRelatedKeyValue :event="event" alternate />
        </template>
      </header>

      <div class="workspace-events-timeline-content__expander" :class="classes.expander" @click="toggle">
        <p-button
          size="sm"
          class="workspace-events-timeline-content__toggle"
          :class="classes.toggle"
          icon="ChevronDownIcon"
        />
        <p-divider />
      </div>

      <template v-if="expanded">
        <template v-if="expandedDebounced">
          <p-code-highlight lang="json" class="workspace-events-timeline-content__raw" :text="stringify(event)" />
        </template>
      </template>
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import EventRelatedKeyValue from '@/components/EventRelatedKeyValue.vue'
  import EventResourceKeyValue from '@/components/EventResourceKeyValue.vue'
  import WorkspaceEventDescription from '@/components/WorkspaceEventDescription.vue'
  import { WorkspaceEvent } from '@/models/workspaceEvent'
  import { stringify } from '@/utilities/json'

  defineProps<{
    event: WorkspaceEvent,
  }>()

  const expanded = ref(false)
  const expandedDebounced = useDebouncedRef(expanded, 150)

  const classes = computed(() => ({
    root: {
      'workspace-events-timeline-content--expanded': expanded.value,
    },
    expander: {
      'workspace-events-timeline-content__expander--expanded': expanded.value,
    },
    toggle: {
      'workspace-events-timeline-content__toggle--expanded': expanded.value,
    },
    container: {
      'workspace-events-timeline-content__container--expanded': expanded.value,
    },
  }))

  function toggle(): void {
    expanded.value = !expanded.value
  }
</script>

<style>
.workspace-events-timeline-content { @apply
  relative
}

.workspace-events-timeline-content:not(.workspace-events-timeline-content--expanded) { @apply
  p-0
}

.workspace-events-timeline-container__header { @apply
  grid
  grid-cols-1
  gap-2
}

.workspace-events-timeline-content__container--expanded { @apply
  grid
  grid-cols-1
  gap-4
}

.workspace-events-timeline-content__raw { @apply
  p-4
  max-h-96
}

.workspace-events-timeline-content__expander { @apply
  mt-2
  cursor-pointer
  opacity-0
  absolute
  left-0
  right-0
  transition-opacity
  h-6
  z-[1]
}

.workspace-events-timeline-content__expander--expanded { @apply
  relative
  opacity-100
}

.workspace-events-timeline-content:hover .workspace-events-timeline-content__expander,
.workspace-events-timeline-content:focus-within .workspace-events-timeline-content__expander { @apply
  opacity-100
}

.workspace-events-timeline-content__toggle { @apply
  bg-[var(--p-color-bg-1)]
  absolute
  rounded-full
  left-1/2
  top-1/2
  -translate-x-1/2
  -translate-y-1/2
  transition-transform
}
.workspace-events-timeline-content__toggle:not(:disabled):hover,
.workspace-events-timeline-content__toggle:not(:disabled):focus { @apply
  bg-[var(--p-color-bg-1)]
}

.workspace-events-timeline-content__toggle--expanded { @apply
  rotate-180
}
</style>