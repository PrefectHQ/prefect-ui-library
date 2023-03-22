<template>
  <div class="artifact-timeline-item" :class="classes.root">
    <div class="artifact-timeline-item__icon-container">
      <div class="artifact-timeline-item__icon" />
    </div>

    <p-card class="artifact-timeline-item__card" :class="classes.card" tabindex="0" @focus="handleFocusIn" @blur="handleFocusOut">
      <p-heading heading="6" @click="toggleExpanded">
        {{ id }}
      </p-heading>

      <template v-if="expanded">
        <template v-if="artifact.description">
          <p-markdown-renderer :text="artifact.description" />

          <p-divider />
        </template>

        <ArtifactDataView :artifact="artifact" />
      </template>
    </p-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import ArtifactDataView from '@/components/ArtifactDataView.vue'
  import { Artifact } from '@/models'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  const expanded = ref(false)

  const id = computed(() => expanded.value ? props.artifact.id : props.artifact.id.slice(0, 8))

  const handleFocusIn = (): void => {
    expanded.value = true
  }

  const handleFocusOut = (): void => {
    expanded.value = false
  }

  const toggleExpanded = (): void => {
    expanded.value = !expanded.value
  }

  const classes = computed(() => ({
    root: {
      'artifact-timeline-item--expanded': expanded.value,
    },
    card: {
      'artifact-timeline-item__card--expanded': expanded.value,
    },
  }))
</script>

<style>
.artifact-timeline-item { @apply
  flex
  pt-2
}

.artifact-timeline-item__icon-container { @apply
  flex
  h-full
  items-start
  justify-center
  pt-1
  px-2
}

.artifact-timeline-item__icon { @apply
  bg-foreground-200
  border
  border-background
  h-4
  max-w-full
  overflow-auto
  rounded-full
  w-4
}

.artifact-timeline-item__card { @apply
  focus:outline-none
  max-w-full
  transition-all
  w-full
}

.artifact-timeline-item__card:not(.artifact-timeline-item__card--expanded) { @apply
  p-0
  bg-transparent
  border-none
  shadow-none
}
</style>