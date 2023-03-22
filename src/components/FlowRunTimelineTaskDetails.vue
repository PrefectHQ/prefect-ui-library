<template>
  <div v-if="task">
    <p-heading element="h3" heading="5">
      <p-link :to="routes.taskRun(taskRunId)">
        {{ task.name }}
      </p-link>
    </p-heading>
    <div class="flow-run-timeline-task-details__content">
      <p-key-value label="State" :alternate="alternate">
        <template #value>
          <StateBadge :state="task.state" class="flow-run-timeline-task-details__state-badge" />
        </template>
      </p-key-value>
      <p-key-value label="Task Run ID" :value="task.id" :alternate="alternate" />
      <p-key-value label="Duration" :alternate="alternate">
        <template #value>
          <DurationIconText :duration="task.duration" />
        </template>
      </p-key-value>
      <p-key-value label="Created" :value="formatDateTimeNumeric(task.created)" :alternate="alternate" />
      <p-key-value label="Tags" :alternate="alternate">
        <template v-if="task.tags?.length" #value>
          <p-tags :tags="task.tags!" class="flow-run-timeline-task-details__tags" />
        </template>
      </p-key-value>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import { StateBadge, DurationIconText } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    taskRunId: string,
  }>()

  const { taskRunId } = toRefs(props)

  const alternate = true

  const routes = useWorkspaceRoutes()

  const api = useWorkspaceApi()
  const taskSubscriptionArgs = computed<[string]>(() => [taskRunId.value])
  const taskSubscription = useSubscriptionWithDependencies(
    api.taskRuns.getTaskRun,
    taskSubscriptionArgs,
  )

  const task = computed(() => taskSubscription.response)
</script>

<style>
.flow-run-timeline-task-details__content { @apply
  mt-2
  flex
  flex-col
  gap-3
}

.flow-run-timeline-task-details__tags .p-tag,
.flow-run-timeline-task-details__state-badge .p-tag { @apply
  !text-xs
}
</style>
