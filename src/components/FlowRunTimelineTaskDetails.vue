<template>
  <div v-if="taskRun">
    <p-heading element="h3" heading="5">
      <p-link :to="routes.taskRun(taskRunId)">
        {{ taskRun.name }}
      </p-link>
    </p-heading>
    <div class="flow-run-timeline-task-details__content">
      <p-key-value label="State" :alternate="alternate">
        <template #value>
          <StateBadge :state="taskRun.state" class="flow-run-timeline-task-details__state-badge" />
        </template>
      </p-key-value>
      <p-key-value label="Task Run ID" :value="taskRun.id" :alternate="alternate" />
      <p-key-value label="Duration" :alternate="alternate">
        <template #value>
          <DurationIconText :duration="taskRun.duration" />
        </template>
      </p-key-value>
      <p-key-value label="Created" :value="formatDateTimeNumeric(taskRun.created)" :alternate="alternate" />
      <p-key-value label="Tags" :alternate="alternate">
        <template v-if="taskRun.tags?.length" #value>
          <p-tags :tags="taskRun.tags!" class="flow-run-timeline-task-details__tags" />
        </template>
      </p-key-value>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue'
  import { StateBadge, DurationIconText } from '@/components'
  import { useTaskRun, useWorkspaceRoutes } from '@/compositions'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    taskRunId: string,
  }>()

  const { taskRunId } = toRefs(props)

  const alternate = true

  const routes = useWorkspaceRoutes()

  const { taskRun } = useTaskRun(taskRunId)
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
