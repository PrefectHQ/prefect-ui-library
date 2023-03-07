<template>
  <div class="flow-run-results">
    <div class="flow-run-results__button-group-container">
      <slot name="actions" />
      <p-button-group v-model="view" :options="viewOptions" />
    </div>

    <div class="flow-run-results__list" :class="classes.list">
      <template v-for="result in results" :key="result.id">
        <ArtifactCard :artifact="result" :condense="condense" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import ArtifactCard from '@/components/ArtifactCard.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRun } from '@/models'
  import { ArtifactsFilter } from '@/models/Filters'

  type ViewOption = 'grid' | 'rows'
  const props = defineProps<{
    flowRun: FlowRun,
    view?: ViewOption,
  }>()

  const view = ref<ViewOption>(props.view ?? 'grid')
  const viewOptions: ButtonGroupOption[] = [
    { label: '', value: 'grid', icon: 'ViewGridIcon' },
    { label: '', value: 'rows', icon: 'ViewListIcon' },
  ]
  const condense = computed(() => view.value === 'rows')

  const api = useWorkspaceApi()
  const resultsFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        flowRunId: [props.flowRun.id],
      },
    }
  })
  const resultsSubscription = useSubscription(api.artifacts.getArtifacts, [resultsFilter])
  const results = computed(() => resultsSubscription.response ?? [])

  const classes = computed(() => {
    return {
      list: {
        'flow-run-results__list--grid': view.value === 'grid',
        'flow-run-results__list--rows': view.value === 'rows',
      },
    }
  })
</script>


<style>
.flow-run-results { @apply
  flex
  flex-col
  gap-4
}

.flow-run-results__button-group-container { @apply
  flex
  justify-end
  gap-4
}

.flow-run-results__list--grid { @apply
  grid
  gap-4;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.flow-run-results__list--rows { @apply
  flex
  flex-col
  gap-4
}
</style>