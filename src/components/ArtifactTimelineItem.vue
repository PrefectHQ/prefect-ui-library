<template>
  <div class="artifact-timeline-item" :class="classes.root">
    <div class="artifact-timeline-item__icon-container">
      <div class="artifact-timeline-item__icon" :class="classes.icon" />
    </div>

    <p-card
      class="artifact-timeline-item__card"
      :class="classes.card"
      tabindex="0"
      @keyup.self.enter="toggleExpanded"
    >
      <p-heading :class="classes.cardHeading" class="artifact-timeline-item__card-heading" heading="6" @click="toggleExpanded">
        <span class="artifact-timeline-item__created" :title="formatDateTimeNumeric(artifact.created)">
          {{ formatDate(artifact.created) }}
        </span>
        <p-link :to="routes.artifact(artifact.id)" :title="artifact.id" @click.stop>
          {{ shortId }}
        </p-link>
      </p-heading>

      <template v-if="expanded">
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
  import { useWorkspaceRoutes } from '@/compositions'
  import { Artifact } from '@/models'
  import { formatDate, formatDateTimeNumeric, isNullish } from '@/utilities'

  type Expanded = boolean | unknown[] | undefined

  const props = defineProps<{
    artifact: Artifact,
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
    icon: {
      'artifact-timeline-item__icon--expanded': expanded.value,
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

.artifact-timeline-item__icon-container { @apply
  flex
  h-6
  items-center
  justify-center
  grow-0
  shrink-0
  relative
  w-10
}

.artifact-timeline-item__icon { @apply
  bg-foreground-200
  border
  border-background
  h-4
  max-w-full
  rounded-full
  transition-all
  w-4;

  transform-origin: center;
}

.artifact-timeline-item__icon--expanded {
  transform: scale(1.5);
}

.artifact-timeline-item:hover .artifact-timeline-item__icon:not(.artifact-timeline-item__icon--expanded) {
  transform: scale(1.3);
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

.artifact-timeline-item__card-heading--expanded { @apply
  p-4
}

.artifact-timeline-item__card-body { @apply
  p-4
}

.artifact-timeline-item__card:not(.artifact-timeline-item__card--expanded) { @apply
  bg-transparent
  border-none
  shadow-none
}

.artifact-timeline-item__created { @apply
  text-foreground-300
  text-sm
}
</style>