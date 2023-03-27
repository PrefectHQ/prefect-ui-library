<template>
  <ArtifactCard :artifact="artifact">
    <template v-if="hasRun && crumbs.length">
      <p-bread-crumbs :crumbs="crumbs" class="artifact-result-card__bread-crumbs" :class="classes.breadCrumbs" />

      <p-markdown-renderer v-if="artifact.description" :text="artifact.description" />
    </template>
  </ArtifactCard>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { ArtifactCard } from '..'
  import { useFlowRun, useTaskRun, useWorkspaceRoutes } from '@/compositions'
  import { ResultArtifact } from '@/models'

  const props = defineProps<{
    artifact: ResultArtifact,
    condense?: boolean,
  }>()

  const routes = useWorkspaceRoutes()
  const route = useRoute()

  const flowRunId = computed(() => props.artifact.flowRunId)
  const taskRunId = computed(() => props.artifact.taskRunId)

  const { flowRun } = useFlowRun(flowRunId)
  const { taskRun } = useTaskRun(taskRunId)

  const hasRun = computed(() => !!props.artifact.flowRunId || !!props.artifact.taskRunId)

  const viewingFlowRun = computed(() => flowRunId.value && route.fullPath.includes(flowRunId.value))
  const viewingTaskRun = computed(() => taskRunId.value && route.fullPath.includes(taskRunId.value))

  const crumbs = computed<BreadCrumbs>(() => {
    const internalCrumbs: BreadCrumbs = []

    if (flowRun.value && !viewingFlowRun.value) {
      internalCrumbs.push({
        text: flowRun.value.name ?? '',
        to: routes.flowRun(flowRun.value.id),
      })
    }

    if (taskRun.value && !viewingTaskRun.value) {
      internalCrumbs.push({
        text: taskRun.value.name ?? '',
        to: routes.taskRun(taskRun.value.id),
      })
    }

    return internalCrumbs
  })

  const classes = computed(() => {
    return {
      breadCrumbs: {
        'artifact-result-card__bread-crumbs--condensed': props.condense,
      },
    }
  })
</script>

<style>
.artifact-result-card__bread-crumbs { @apply
  text-base
  flex-nowrap
  overflow-hidden
}

.artifact-result-card__bread-crumbs .p-bread-crumbs__crumb { @apply
  whitespace-nowrap
  overflow-ellipsis
}

.artifact-result-card__bread-crumbs--condensed { @apply
  text-sm
}
</style>