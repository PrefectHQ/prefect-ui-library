<template>
  <div class="artifact-timeline-item">
    <div class="artifact-timeline-item__icon-container">
      <div class="artifact-timeline-item__icon" />
    </div>

    <p-card class="artifact-timeline__card" tabindex="0" @focus="handleFocusIn" @blur="handleFocusOut">
      <p-heading heading="6">
        {{ id }}
      </p-heading>

      <template v-if="focused">
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

  const focused = ref(false)

  const id = computed(() => focused.value ? props.artifact.id : props.artifact.id.slice(0, 8))

  const handleFocusIn = (): void => {
    focused.value = true
  }

  const handleFocusOut = (): void => {
    focused.value = false
  }
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

.artifact-timeline__card { @apply
  max-w-full
  transition-all
  w-full
}

.artifact-timeline-item:not(:focus-within) .artifact-timeline__card { @apply
  p-0
  bg-transparent
  border-none
  shadow-none
}
</style>