<template>
  <div ref="el" class="flow-run-task-count">
    <template v-if="tasksCount.response">
      <p-icon-text icon="Task">
        {{ tasksCount.response }} task {{ toPluralString('run', tasksCount.response) }}
      </p-icon-text>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRun } from '@/models/FlowRun'
  import { toPluralString } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const el = ref<HTMLDivElement>()

  const isScheduled = computed(() => props.flowRun.stateType == 'scheduled')

  const api = useWorkspaceApi()


  const tasksCountFilter = computed<Parameters<typeof api.taskRuns.getTaskRunsCount> | null>(() => {
    if (isScheduled.value) {
      return null
    }

    return [
      {
        flow_runs: {
          id: {
            any_: [props.flowRun.id],
          },
        },
      },
    ]
  })

  const tasksCount = useSubscriptionWithDependencies(api.taskRuns.getTaskRunsCount, tasksCountFilter)
</script>