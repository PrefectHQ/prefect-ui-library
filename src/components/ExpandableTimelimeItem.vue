<template>
  <p-card
    class="artifact-timeline-item-content"
    :class="classes.card"
    tabindex="0"
    :flat="!expanded"
  >
    <p-heading :class="classes.cardHeading" class="artifact-timeline-item-content__heading" heading="6">
      <p-link :to="routes.artifact(artifact.id)" :title="artifact.id">
        {{ shortId }}
      </p-link>
    </p-heading>

    <template v-if="artifact.flowRunId">
      <div class="artifact-timeline-item-content__icon-text-container">
        {{ localization.info.flowRun }}
        <FlowRunIconText class="artifact-timeline-item-content__icon-text" :flow-run-id="artifact.flowRunId" />
      </div>
    </template>

    <template v-if="artifact.taskRunId">
      <div class="artifact-timeline-item-content__icon-text-container">
        {{ localization.info.taskRun }}
        <TaskRunIconText class="artifact-timeline-item-content__icon-text" :task-run-id="artifact.taskRunId" />
      </div>
    </template>

    <template v-if="expanded">
      <p-divider />

      <section class="artifact-timeline-item-content__body">
        <template v-if="artifact.description">
          <p-markdown-renderer :text="artifact.description" />

          <p-divider />
        </template>

        <ArtifactDataView :artifact="artifact" />
      </section>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import ArtifactDataView from '@/components/ArtifactDataView.vue'
  import FlowRunIconText from '@/components/FlowRunIconText.vue'
  import TaskRunIconText from '@/components/TaskRunIconText.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Artifact } from '@/models'

  const props = defineProps<{
    artifact: Artifact,
    expanded?: boolean,
  }>()

  const routes = useWorkspaceRoutes()

  const shortId = computed(() => props.artifact.id.slice(0, 8))

  const classes = computed(() => ({
    card: {
      'artifact-timeline-item-content--expanded': props.expanded,
    },
    cardHeading: {
      'artifact-timeline-item-content__heading--expanded': props.expanded,
    },
  }))
</script>

<style>
.artifact-timeline-item-content { @apply
  h-auto
  p-0
  flex
  flex-col
  gap-2
  transition-all
}

.artifact-timeline-item-content--expanded { @apply
  mt-6
}

.artifact-timeline-item-content__icon-texts-container { @apply
  mt-1
  gap-1
  flex
  flex-col
}

.artifact-timeline-item-content__icon-text-container { @apply
  flex
  gap-1
  text-xs
  font-normal
}

.artifact-timeline-item-content--expanded { @apply
  -mt-3
}

.artifact-timeline-item-content__heading { @apply
  cursor-pointer
  transition-all
}

.artifact-timeline-item-content__heading--expanded,
.artifact-timeline-item-content__body { @apply
  p-4
}
</style>