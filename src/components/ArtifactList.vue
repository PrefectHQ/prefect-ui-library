<template>
  <div class="artifact-list">
    <div class="artifact-list__button-group-container">
      <p-button-group v-model="view" :options="viewOptions" />
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

  defineProps<{
    artifacts: Artifact[],
  }>()

  const view = ref<'grid' | 'rows'>('grid')
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
}

.artifact-list__artifacts--grid { @apply
  grid
  grid-cols-1
  gap-4
  md:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
}

.artifact-list__artifacts--rows { @apply
  flex
  flex-col
  gap-4
}
</style>