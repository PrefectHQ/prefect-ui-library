<template>
  <div class="artifact-list">
    <div>
      <p-button-group v-model="view" :options="viewOptions" />
    </div>

    <div class="artifact-list__artifacts" :class="classes.artifacts">
      <template v-for="artifact in artifacts" :key="artifact.id">
        <ArtifactSummaryCard :artifact="artifact" :condense="condense" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { ref, computed } from 'vue'
  import ArtifactSummaryCard from '@/components/ArtifactSummaryCard.vue'
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
</script>

<style>
.artifact-list { @apply
  flex
  flex-col
  gap-4
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