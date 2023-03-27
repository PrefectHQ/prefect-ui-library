<template>
  <div class="artifact-timeline-item" :class="classes.root">
    <div class="artifact-timeline-item__point-container">
      <div class="artifact-timeline-item__point" :class="classes.point" />
    </div>

    <p-card
      class="artifact-timeline-item__card"
      :class="classes.card"
      tabindex="0"
      @keyup.self.enter="toggleExpanded"
    >
      <p-heading :class="classes.cardHeading" class="artifact-timeline-item__card-heading" heading="6" @click="toggleExpanded">
        <div>
          <div class="artifact-timeline-item__created" :title="formatDateTimeNumeric(artifact.created)">
            {{ formatDate(artifact.created) }} <span v-if="latest" class="artifact-timeline-item__latest">({{ localization.info.latest }})</span>
          </div>
          <div class="artifact-timeline-item__icon-texts-container">
            <template v-if="artifact.flowRunId">
              <div class="artifact-timeline-item__icon-text-container">
                {{ localization.info.flowRun }}
                <FlowRunIconText class="artifact-timeline-item__icon-text" :flow-run-id="artifact.flowRunId" />
              </div>
            </template>

            <template v-if="artifact.taskRunId">
              <div class="artifact-timeline-item__icon-text-container">
                {{ localization.info.taskRun }}
                <TaskRunIconText class="artifact-timeline-item__icon-text" :task-run-id="artifact.taskRunId" />
              </div>
            </template>
          </div>
        </div>

        <p-link :to="routes.artifact(artifact.id)" :title="artifact.id" @click.stop>
          {{ shortId }}
        </p-link>
      </p-heading>

      <template v-if="expanded">
        <p-divider />

        <section class="artifact-timeline-item__card-body">
          <template v-if="artifact.description">
            <p-markdown-renderer :text="artifact.description" />

            <p-divider />
          </template>

          <ArtifactDataView :artifact="artifact" />
        </section>
      </template>
    </p-card>
  </div>
</template>

<script lang="ts" setup>
  import { isArray } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ArtifactDataView from '@/components/ArtifactDataView.vue'
  import FlowRunIconText from '@/components/FlowRunIconText.vue'
  import TaskRunIconText from '@/components/TaskRunIconText.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Artifact } from '@/models'
  import { formatDate, formatDateTimeNumeric, isNullish } from '@/utilities'

  type Expanded = boolean | unknown[] | undefined

  const props = defineProps<{
    artifact: Artifact,
    latest?: boolean,
    expanded?: Expanded | null,
    value?: unknown,
  }>()

  const routes = useWorkspaceRoutes()

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

  const shortId = computed(() => props.artifact.id.slice(0, 8))

  const classes = computed(() => ({
    root: {
      'artifact-timeline-item--expanded': expanded.value,
    },
    card: {
      'artifact-timeline-item__card--expanded': expanded.value,
    },
    cardHeading: {
      'artifact-timeline-item__card-heading--expanded': expanded.value,
    },
    point: {
      'artifact-timeline-item__point--expanded': expanded.value,
    },
  }))
</script>

<style>
.artifact-timeline-item { @apply
  flex
  items-start
  justify-start
  h-auto
  transition-all
}

.artifact-timeline-item.artifact-timeline-item--expanded { @apply
  mt-6
}

/* Note that this won't be necessary once https://github.com/PrefectHQ/prefect-design/pull/698 is released */
.artifact-timeline-item.artifact-timeline-item--expanded .p-divider { @apply
  bg-foreground-50
}

.artifact-timeline-item__point-container { @apply
  flex
  h-6
  items-center
  justify-center
  grow-0
  shrink-0
  relative
  w-10
}

.artifact-timeline-item__point { @apply
  bg-foreground-200
  border-2
  border-background-600
  dark:border-background-300
  h-4
  max-w-full
  rounded-full
  transition-all
  w-4;

  transform-origin: center;
}

.artifact-timeline-item__icon-texts-container { @apply
  mt-1
  gap-1
  flex
  flex-col
}

.artifact-timeline-item__icon-text-container { @apply
  flex
  gap-1
  text-xs
  font-normal
}

.artifact-timeline-item__point--expanded,
.artifact-timeline-item:hover .artifact-timeline-item__point:not(.artifact-timeline-item__point--expanded) {
  transform: scale(1.5);
}

.artifact-timeline-item__card { @apply
  outline-none
  focus:outline-none
  max-w-full
  p-0
  shrink
  transition-all
  w-full
}

.artifact-timeline-item__card--expanded { @apply
  -mt-3
}

.artifact-timeline-item__card-heading { @apply
  cursor-pointer
  flex
  justify-between
  transition-all
  text-sm
}

.artifact-timeline-item__card-heading--expanded,
.artifact-timeline-item__card-body { @apply
  p-4
}

.artifact-timeline-item__card:not(.artifact-timeline-item__card--expanded) { @apply
  bg-transparent
  border-none
  shadow-none
}

.artifact-timeline-item__created { @apply
  text-foreground-400
  text-sm
}
</style>