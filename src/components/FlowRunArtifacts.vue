<template>
  <div class="flow-run-artifacts">
    <template v-if="hasArtifacts">
      <div class="flow-run-artifacts__button-group-container">
        <slot name="actions" />
        <ViewModeButtonGroup class="flow-run-artifacts__view-mode-button-group" />
      </div>

      <p-heading heading="6" class="flow-run-artifacts__subheading">
        {{ localization.info.flowRun }}
      </p-heading>

      <RowGridLayoutList :items="flowRunArtifacts">
        <template #default="{ item }">
          <ArtifactCard :artifact="item" :condense="condense" class="flow-run-artifacts__artifact" />
        </template>

        <template #empty>
          <div class="flow-run-artifacts__none">
            <p-markdown-renderer :text="localization.info.noResults" />
          </div>
        </template>
      </RowGridLayoutList>

      <p-divider />

      <p-heading heading="6" class="flow-run-artifacts__subheading">
        {{ localization.info.taskRuns }}
      </p-heading>

      <RowGridLayoutList :items="taskRunArtifacts">
        <template #default="{ item }">
          <ArtifactCard :artifact="item" :condense="condense" class="flow-run-artifacts__artifact" />
        </template>

        <template #empty>
          <div class="flow-run-artifacts__none">
            <p-markdown-renderer :text="localization.info.noResults" />
          </div>
        </template>
      </RowGridLayoutList>
    </template>

    <template v-else-if="artifactsSubscription.executed">
      <p-empty-state>
        <template #description>
          <p-markdown-renderer :text="emptyMessage" />
        </template>
      </p-empty-state>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import ArtifactCard from '@/components/ArtifactCard.vue'
  import RowGridLayoutList from '@/components/RowGridLayoutList.vue'
  import ViewModeButtonGroup from '@/components/ViewModeButtonGroup.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowRun, isTerminalStateType } from '@/models'
  import { ArtifactsFilter } from '@/models/Filters'
  import { activeViewMode } from '@/utilities/activeViewMode'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const condense = computed(() => activeViewMode.value !== 'grid')

  const api = useWorkspaceApi()
  const artifactsFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        flowRunId: [props.flowRun.id],
        notType: ['result'],
      },
    }
  })
  const artifactsSubscription = useSubscription(api.artifacts.getArtifacts, [artifactsFilter], { interval: 5000 })
  const artifacts = computed(() => artifactsSubscription.response ?? [])

  const taskRunArtifacts = computed(() => artifacts.value.filter(artifact => !!artifact.taskRunId))
  const flowRunArtifacts = computed(() => artifacts.value.filter(artifact => !!artifact.flowRunId && !artifact.taskRunId))

  const hasArtifacts = computed(() => artifactsSubscription.executed && artifacts.value.length > 0)
  const isTerminal = computed(() => isTerminalStateType(props.flowRun.state?.type))
  const emptyMessage = computed(() => {
    if (artifactsSubscription.executed && artifacts.value.length === 0) {
      if (isTerminal.value) {

        return localization.info.terminalFlowRunNoArtifacts
      }

      return localization.info.nonTerminalFlowRunNoArtifacts
    }

    return ''
  })
</script>


<style>
.flow-run-artifacts { @apply
  flex
  flex-col
  gap-4
}

.flow-run-artifacts__button-group-container { @apply
  flex
  justify-end
  gap-4
}

.flow-run-artifacts__artifact { @apply
  hover:border-primary
  focus:border-primary
}

.flow-run-artifacts__none { @apply
  text-foreground-50
}
</style>