<template>
  <div class="task-run-artifacts">
    <div class="task-run-artifacts__button-group-container">
      <slot name="actions" />
      <ViewModeButtonGroup class="task-run-artifacts__view-mode-button-group" />
    </div>

    <RowGridLayoutList :items="artifacts">
      <template #default="{ item }">
        <router-link :to="routes.artifact(item.id)">
          <ArtifactCard :artifact="item" :condense="condense" interactive />
        </router-link>
      </template>

      <template v-if="artifactsSubscription.executed" #empty>
        <p-empty-state>
          <template #description>
            <p-markdown-renderer :text="emptyMessage" />
          </template>
        </p-empty-state>
      </template>
    </RowGridLayoutList>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import ArtifactCard from '@/components/ArtifactCard.vue'
  import RowGridLayoutList from '@/components/RowGridLayoutList.vue'
  import ViewModeButtonGroup from '@/components/ViewModeButtonGroup.vue'
  import { useStatePolling, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { TaskRun, isTerminalStateType } from '@/models'
  import { ArtifactsFilter } from '@/models/Filters'
  import { activeViewMode } from '@/utilities/activeViewMode'

  const props = defineProps<{
    taskRun: TaskRun,
  }>()

  const condense = computed(() => activeViewMode.value !== 'grid')

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const artifactsFilter = computed<ArtifactsFilter>(() => {
    return {
      artifacts: {
        taskRunId: [props.taskRun.id],
        notType: ['result'],
      },
    }
  })
  const stateName = computed(() => props.taskRun.state?.name ?? null)
  const artifactsSubscriptionOptions = useStatePolling(stateName, 10000)
  const artifactsSubscription = useSubscription(api.artifacts.getArtifacts, [artifactsFilter], artifactsSubscriptionOptions)
  const artifacts = computed(() => artifactsSubscription.response ?? [])

  const isTerminal = computed(() => isTerminalStateType(props.taskRun.state?.type))
  const emptyMessage = computed(() => {
    if (artifactsSubscription.executed && artifacts.value.length === 0) {
      if (isTerminal.value) {
        return localization.info.terminalTaskRunNoArtifacts
      }

      return localization.info.nonTerminalTaskRunNoArtifacts
    }

    return ''
  })
</script>


<style>
.task-run-artifacts { @apply
  flex
  flex-col
  gap-4
}

.task-run-artifacts__button-group-container { @apply
  flex
  justify-end
  gap-4
}
</style>