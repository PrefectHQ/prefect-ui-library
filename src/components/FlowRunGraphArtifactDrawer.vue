<template>
  <p-drawer
    class="flow-run-graph-artifact-drawer"
    :open="artifactId !== null"
    placement="right"
    @update:open="close"
  >
    <template v-if="artifact">
      <div class="flow-run-graph-artifact-drawer__header">
        <div class="flow-run-graph-artifact-drawer__details">
          <p-key-value v-if="artifact.key" label="Key">
            <template #value>
              <ArtifactKeyIconText :artifact-id="artifact.id" />
            </template>
          </p-key-value>
          <p-key-value v-if="taskRun?.tags?.length" label="Tags">
            <template #value>
              <p-tags :tags="taskRun.tags!" />
            </template>
          </p-key-value>
          <p-key-value label="Description">
            <template #value>
              <ArtifactDescription :artifact="artifact" />
            </template>
          </p-key-value>
        </div>
        <p-button
          small
          flat
          icon="ArrowTopRightOnSquareIcon"
          :to="routes.artifact(artifact.id)"
          target="_blank"
          title="Open artifact in a new tab"
        />
        <p-button small flat icon="XMarkIcon" title="Close drawer" @click="close" />
      </div>
      <p-divider />
      <ArtifactDataView :artifact="artifact" />
    </template>
    <template v-else>
      <p-loading-icon class="flow-run-graph-artifact-drawer__loading" />
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
  gap-2
  items-start
}

.flow-run-graph-artifact-drawer__details { @apply
  flex-grow
  flex
  flex-col
  gap-2
}

.flow-run-graph-artifact-drawer__loading { @apply
  absolute
  top-1/2
  left-1/2
  -translate-x-1/2
  -translate-y-1/2
}
</style>