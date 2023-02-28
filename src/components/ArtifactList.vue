<template>
  <div class="artifact-list">
    <div class="artifact-list__button-group-container">
      <slot name="actions" />
      <p-button-group v-if="!hideViewOptions" v-model="view" :options="viewOptions" />
    </div>

    <div class="artifact-list__artifacts" :class="classes.artifacts">
      <template v-for="artifact in artifacts" :key="artifact.id">
        <component :is="getArtifactComponent(artifact)" :artifact="artifact" :condense="condense" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { ref, computed } from 'vue'
  import ArtifactSummaryCard from '@/components/ArtifactSummaryCard.vue'
  import ResultSummaryCard from '@/components/ResultSummaryCard.vue'
  import { Artifact } from '@/models'

  type ViewOption = 'grid' | 'rows'
  const props = defineProps<{
    artifacts: Artifact[],
    view?: ViewOption,
    hideViewOptions?: boolean,
  }>()

  const view = ref<ViewOption>(props.view ?? 'grid')
  const viewOptions: ButtonGroupOption[] = [
    { label: '', value: 'grid', icon: 'ViewGridIcon' },
    { label: '', value: 'rows', icon: 'ViewListIcon' },
  ]

  const condense = computed(() => view.value === 'rows')

  const classes = computed(() => {
    return {
      artifacts: {
        'artifact-list__artifacts--grid': view.value === 'grid',
        'artifact-list__artifacts--rows': view.value === 'rows',
      },
    }
  })

  const getArtifactComponent = (artifact: Artifact): typeof ArtifactSummaryCard | typeof ResultSummaryCard => {
    if (artifact.key) {
      return ArtifactSummaryCard
    }

    return ResultSummaryCard
  }
</script>

<style>
.artifact-list { @apply
  flex
  flex-col
  gap-4
}

.artifact-list__button-group-container { @apply
  flex
  justify-end
  gap-4
}

.artifact-list__artifacts--grid { @apply
  grid
  grid-cols-1
  gap-4
  md:grid-cols-1
  lg:grid-cols-2
  xl:grid-cols-3
}

.artifact-list__artifacts--rows { @apply
  flex
  flex-col
  gap-4
}
</style>