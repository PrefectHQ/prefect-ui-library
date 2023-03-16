<template>
  <div class="flow-run-results">
    <template v-if="hasResults">
      <div class="flow-run-results__button-group-container">
        <slot name="actions" />
        {{ activeViewMode }}
        <p-button-group v-model="activeViewMode" :options="viewOptions" />
      </div>

      <p-heading heading="6" class="flow-run-results__subheading">
        {{ localization.info.flowRun }}
      </p-heading>
      <div class="flow-run-results__list" :class="classes.list">
        <template v-if="flowRunResults.length">
          <template v-for="result in flowRunResults" :key="result.id">
            <ArtifactCard :artifact="result" :condense="condense" class="flow-run-results__artifact">
              <p-markdown-renderer v-if="result.description" :text="result.description" />
            </ArtifactCard>
          </template>
        </template>
        <template v-else>
          <div class="flow-run-results__none">
            {{ localization.info.noResults }}
          </div>
        </template>
      </div>

      <p-divider />

      <p-heading heading="6" class="flow-run-results__subheading">
        {{ localization.info.taskRuns }}
      </p-heading>
      <div class="flow-run-results__list" :class="classes.list">
        <template v-if="taskRunResults.length">
          <template v-for="result in taskRunResults" :key="result.id">
            <ArtifactCard :artifact="result" :condense="condense" class="flow-run-results__artifact">
              <p-markdown-renderer v-if="result.description" :text="result.description" />
            </ArtifactCard>
          </template>
        </template>
        <template v-else>
          <div class="flow-run-results__none">
            {{ localization.info.noResults }}
          </div>
        </template>
      </div>
    </template>

    <template v-else-if="resultsSubscription.executed">
      <p-empty-state>
        <template #description>
          {{ localization.info.noResults }}
        </template>
      </p-empty-state>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import ArtifactCard from '@/components/ArtifactCard.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowRun } from '@/models'
  import { ArtifactsFilter } from '@/models/Filters'
  import { useActiveViewMode } from '@/utilities/artifactsViewMode'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const viewOptions: ButtonGroupOption[] = [
    { label: '', value: 'grid', icon: 'ViewGridIcon' },
    { label: '', value: 'rows', icon: 'ViewListIcon' },
  ]

  const { activeViewMode } = useActiveViewMode()
  const condense = computed(() => activeViewMode.value === 'rows')

  const api = useWorkspaceApi()
  const resultsFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        flowRunId: [props.flowRun.id],
      },
    }
  })
  const resultsSubscription = useSubscription(api.artifacts.getArtifacts, [resultsFilter], { interval: 5000 })
  const results = computed(() => resultsSubscription.response ?? [])

  const taskRunResults = computed(() => results.value.filter(result => !!result.taskRunId))
  const flowRunResults = computed(() => results.value.filter(result => !!result.flowRunId && !result.taskRunId))

  const hasResults = computed(() => resultsSubscription.executed && results.value.length > 0)

  const classes = computed(() => {
    return {
      list: {
        'flow-run-results__list--grid': activeViewMode.value === 'grid',
        'flow-run-results__list--rows': activeViewMode.value === 'rows',
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

.flow-run-results__list { @apply
  flex
  flex-col
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

.flow-run-results__artifact { @apply
  hover:border-primary
  focus:border-primary
  h-full
}

.flow-run-results__none { @apply
  text-foreground-50
}
</style>