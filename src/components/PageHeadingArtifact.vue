<template>
  <PageHeading class="page-heading-artifact" :crumbs="crumbs">
    <template #actions>
      <ArtifactMenu :artifact="artifact" />
    </template>
  </PageHeading>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ArtifactMenu from '@/components/ArtifactMenu.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useFlowRun, useTaskRun, useWorkspaceRoutes } from '@/compositions'
  import { Artifact } from '@/models'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  const routes = useWorkspaceRoutes()

  const flowRunId = computed(() => props.artifact.flowRunId)
  const taskRunId = computed(() => props.artifact.taskRunId)

  const { flowRun } = useFlowRun(flowRunId)
  const { taskRun } = useTaskRun(taskRunId)

  const hasRun = computed(() => !!props.artifact.flowRunId || !!props.artifact.taskRunId)

  const crumbs = computed<BreadCrumbs>(() => {
    const internalCrumbs: BreadCrumbs = []

    if (hasRun.value && !props.artifact.key) {
      if (flowRun.value) {
        internalCrumbs.push({
          text: flowRun.value.name ?? '',
          to: routes.flowRun(flowRun.value.id),
        })
      }

      if (taskRun.value) {
        internalCrumbs.push({
          text: taskRun.value.name ?? '',
          to: routes.taskRun(taskRun.value.id),
        })
      }
    } else if (props.artifact.key) {
      internalCrumbs.push({
        text: props.artifact.key,
        to: routes.artifactKey(props.artifact.id),
      })
    }

    internalCrumbs.push({
      text: props.artifact.id,
    })

    return internalCrumbs
  })
</script>