<template>
  <p-card
    class="artifact-timeline-item-content"
    :class="classes.root"
    tabindex="0"
    :flat="!expanded"
    @keyup.self.enter="toggleExpanded"
  >
    <div class="artifact-timeline-item-content__heading" :class="classes.heading" @click="toggleExpanded">
      <p-heading heading="6">
        <p-link :to="routes.artifact(artifact.id)" :title="artifact.id" @click.stop>
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
    </div>

    <template v-if="expanded">
      <p-divider />

      <template v-if="expandedDebounced">
        <section class="artifact-timeline-item-content__body">
          <template v-if="artifact.description">
            <p-markdown-renderer :text="artifact.description" />

            <p-divider />
          </template>

          <ArtifactDataView :artifact="artifact" />
        </section>
      </template>

      <template v-else>
        <div class="artifact-timeline-item-content__loading">
          <p-loading-icon />
        </div>
      </template>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { isArray } from 'lodash'
  import { computed } from 'vue'
  import ArtifactDataView from '@/components/ArtifactDataView.vue'
  import FlowRunIconText from '@/components/FlowRunIconText.vue'
  import TaskRunIconText from '@/components/TaskRunIconText.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Artifact } from '@/models'
  import { isNullish } from '@/utilities'

  type Expanded = boolean | unknown[] | undefined | null

  const props = defineProps<{
    artifact: Artifact,
    // TODO: I don't think this logic makes sense here
    // but I want to wait to create a more generic expanded card component
    expanded?: Expanded,
    value?: unknown,
  }>()

  const emit = defineEmits<{
    (event: 'update:expanded', value: Expanded): void,
  }>()
  const expandedModel = computed({
    get() {
      return props.expanded ?? undefined
    },
    set(value) {
      emit('update:expanded', value)
    },
  })

  const expanded = computed(() => {
    if (isNullish(expandedModel.value)) {
      return false
    }
    if (isArray(expandedModel.value)) {
      return expandedModel.value.includes(props.value)
    }
    return expandedModel.value
  })
  const expandedDebounced = useDebouncedRef(expanded, 1000)

  const toggleExpanded = (): void => {
    if (isNullish(expandedModel.value)) {
      return
    }
    if (isArray(expandedModel.value)) {
      if (expanded.value) {
        expandedModel.value = expandedModel.value.filter((value) => value !== props.value)
      } else {
        expandedModel.value = [...expandedModel.value, props.value]
      }
      return
    }
    expandedModel.value = !expandedModel.value
  }

  const routes = useWorkspaceRoutes()

  const shortId = computed(() => props.artifact.id.slice(0, 8))

  const classes = computed(() => ({
    root: {
      'artifact-timeline-item-content--expanded': expanded.value,
    },
    heading: {
      'artifact-timeline-item-content__heading--expanded': expanded.value,
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
  ml-0
  hover:ml-1
  transition-all
}


.artifact-timeline-item-content--expanded { @apply
  mt-1
  hover:ml-0
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

.artifact-timeline-item-content__heading { @apply
  cursor-pointer
  p-0
  flex
  flex-col
  transition-all
}

.artifact-timeline-item-content__heading--expanded,
.artifact-timeline-item-content__body { @apply
  p-4
}

.artifact-timeline-item-content__loading { @apply
  flex
  justify-center
  items-center
  h-16
}
</style>