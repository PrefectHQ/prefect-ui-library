<template>
  <p-drawer
    class="flow-run-graph-artifact-drawer"
    :open="artifactId !== null"
    placement="right"
    @update:open="close"
  >
    <template v-if="artifactId && artifact">
      <div class="flow-run-graph-artifact-drawer__header">
        <div class="flow-run-graph-artifact-drawer__title-row">
          <ArtifactKeyIconText class="flow-run-graph-artifact-drawer__name" :artifact-id="artifactId" />
          <p-button small flat icon="ArrowTopRightOnSquareIcon" :to="routes.artifact(artifact.id)" target="_blank" />
        </div>
        <template v-if="taskRun?.tags?.length">
          <p-tags :tags="taskRun.tags!" />
        </template>
        <ArtifactDescription :artifact="artifact" />
      </div>
      <ArtifactDataView :artifact="artifact" />
    </template>
  </p-drawer>
</template>

<script lang="ts" setup>
  import { GraphItemSelection, isArtifactSelection } from '@prefecthq/graphs'
  import { computed } from 'vue'
  import { ArtifactDataView, ArtifactDescription, ArtifactKeyIconText } from '@/components'
  import { useArtifact, useTaskRun, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    selection: GraphItemSelection | null,
  }>()

  const emit = defineEmits<{
    'update:selection': [null],
  }>()

  const routes = useWorkspaceRoutes()

  function close(): void {
    emit('update:selection', null)
  }

  const artifactId = computed(() => {
    if (props.selection && isArtifactSelection(props.selection)) {
      return props.selection.id
    }

    return null
  })

  const { artifact } = useArtifact(artifactId)

  const taskRunId = computed(() => artifact.value?.taskRunId)
  const { taskRun } = useTaskRun(taskRunId)
</script>

<style>
.p-drawer:has(.flow-run-graph-artifact-drawer) {
  --p-drawer-size: 95vw;
  --p-drawer-max-size: 640px;
  --p-drawer-min-size: 33.33vw;
}

.flow-run-graph-artifact-drawer { @apply
  bg-floating
  p-4
  rounded-l-md
  shadow-xl
  overflow-auto;

  height: calc(100% - 1rem);
  margin-top: 0.5rem;
}

.flow-run-graph-artifact-drawer__header { @apply
  flex
  flex-col
  gap-2
  border-b
  border-divider
  pb-2
  mb-2
}

.flow-run-graph-artifact-drawer__title-row { @apply
  flex
  items-center
  justify-between
}

.flow-run-graph-artifact-drawer__name .p-icon { @apply
  w-5
  h-5
}
.flow-run-graph-artifact-drawer__name .p-icon-text__label { @apply
  text-base
  font-semibold
}
</style>