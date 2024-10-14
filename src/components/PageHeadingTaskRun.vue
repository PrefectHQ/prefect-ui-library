<template>
  <page-heading v-if="taskRun" class="page-heading-task-run" :crumbs="crumbs">
    <template #after-crumbs>
      <StateBadge :state="taskRun.state" />
    </template>

    <template #actions>
      <TaskRunMenu :task-run @delete="emit('delete')" @update="taskRunSubscription.refresh" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { Crumb } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { StateBadge, PageHeading, TaskRunMenu } from '@/components'
  import { useFlowRun, useTaskRun, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    taskRunId: string,
  }>()

  const emit = defineEmits(['delete'])

  const routes = useWorkspaceRoutes()
  const { taskRun, subscription: taskRunSubscription } = useTaskRun(() => props.taskRunId)
  const { flowRun } = useFlowRun(() => taskRun.value?.flowRunId)

  const crumbs = computed(() => {
    const crumbs: Crumb[] = [{ text: 'Runs', to: routes.runs({ tab: 'task-runs' }) }]

    if (flowRun.value) {
      crumbs.push({ text: flowRun.value.name ?? '', to: routes.flowRun(flowRun.value.id) })
    }

    crumbs.push({ text: taskRun.value?.name ?? '' })

    return crumbs
  })
</script>