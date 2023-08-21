<template>
  <div class="flow-run-results">
    <template v-if="hasResults">
      <div class="flow-run-results__button-group-container">
        <slot name="actions" />
        <ViewModeButtonGroup class="flow-run-results__view-mode-button-group" />
      </div>

      <p-heading heading="6" class="flow-run-results__subheading">
        {{ localization.info.flowRun }}
      </p-heading>

      <RowGridLayoutList :items="flowRunResults">
        <template #default="{ item }: { item: ResultArtifact }">
          <ArtifactResultCard :artifact="item" :condense="condense" />
        </template>

        <template #empty>
          <div class="flow-run-results__none">
            <p-markdown-renderer :text="localization.info.noResults" />
          </div>
        </template>
      </RowGridLayoutList>

      <p-divider />

      <p-heading heading="6" class="flow-run-results__subheading">
        {{ localization.info.taskRuns }}
      </p-heading>

      <RowGridLayoutList :items="taskRunResults">
        <template #default="{ item }: { item: ResultArtifact }">
          <ArtifactResultCard :artifact="item" :condense="condense" />
        </template>

        <template #empty>
          <div class="flow-run-results__none">
            <p-markdown-renderer :text="localization.info.noResults" />
          </div>
        </template>
      </RowGridLayoutList>
    </template>

    <template v-else-if="resultsSubscription.executed">
      <p-empty-state>
        <template #description>
          <p-markdown-renderer :text="localization.info.noResults" />
        </template>
      </p-empty-state>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import ArtifactResultCard from '@/components/ArtifactResultCard.vue'
  import RowGridLayoutList from '@/components/RowGridLayoutList.vue'
  import ViewModeButtonGroup from '@/components/ViewModeButtonGroup.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useStatePolling } from '@/compositions/useStatePolling'
  import { localization } from '@/localization'
  import { FlowRun, ResultArtifact } from '@/models'
  import { ArtifactsFilter } from '@/models/Filters'
  import { activeViewMode } from '@/utilities/activeViewMode'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const { flowRun } = toRefs(props)
  const condense = computed(() => activeViewMode.value !== 'grid')

  const api = useWorkspaceApi()
  const resultsFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        flowRunId: [props.flowRun.id],
        type: ['result'],
      },
    }
  })
  const resultsSubscriptionOptions = useStatePolling(flowRun)
  const resultsSubscription = useSubscription(api.artifacts.getArtifacts, [resultsFilter], resultsSubscriptionOptions)
  const results = computed(() => resultsSubscription.response ?? [])

  const taskRunResults = computed(() => results.value.filter(result => !!result.taskRunId))
  const flowRunResults = computed(() => results.value.filter(result => !!result.flowRunId && !result.taskRunId))

  const hasResults = computed(() => resultsSubscription.executed && results.value.length > 0)
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

.flow-run-results__none { @apply
  text-subdued
}
</style>