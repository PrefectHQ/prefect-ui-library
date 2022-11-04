<template>
  <template v-if="tasksCount">
    <div class="flow-run-task-count">
      <p-icon-text icon="Task">
        <slot v-bind="{ tasksCount }">
          {{ tasksCount }}
        </slot>
      </p-icon-text>
    </div>
  </template>
  <template v-else>
    None
  </template>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRun } from '@/models/FlowRun'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

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

  const tasksCountSubscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRunsCount, tasksCountFilter)
  const tasksCount = computed(() => {
    console.log(tasksCountSubscription)
    return tasksCountSubscription.response ?? 0
  })
</script>