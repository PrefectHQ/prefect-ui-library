<template>
  <div class="task-run-panel">
    <template v-if="taskRun">
      <div class="flex justify-between items-start w-full">
        <page-heading :crumbs="crumbs" size="sm">
          <template #after-crumbs>
            <StateBadge :state="taskRun.state" class="task-run-panel__state-badge" />
          </template>
        </page-heading>
        <p-button size="xs" icon="XIcon" flat @click="closePanel" />
      </div>

      <p-divider />

      <div class="task-run-panel__details">
        <p-key-value label="Task Run ID" :value="taskRun.id" :alternate="alternate" />
        <p-key-value label="Duration" :alternate="alternate">
          <template #value>
            <DurationIconText :duration="taskRun.duration" />
          </template>
        </p-key-value>
        <p-key-value label="Created" :value="formatDateTimeNumeric(taskRun.created)" :alternate="alternate" />
        <p-key-value label="Tags" :alternate="alternate">
          <template v-if="taskRun.tags?.length" #value>
            <p-tags :tags="taskRun.tags!" class="task-run-panel__tags" />
          </template>
        </p-key-value>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref, toRefs } from 'vue'
  import { StateBadge, DurationIconText, PageHeading } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    taskRunId: string | null,
  }>()

  const { taskRunId } = toRefs(props)

  const alternate = true

  const emit = defineEmits<{
    (event: 'dismiss'): void,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const taskRunIdArgs = computed<[string] | null>(() => taskRunId.value ? [taskRunId.value] : null)
  const taskRunSubscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRun, taskRunIdArgs)
  const taskRun = computed(() => taskRunSubscription.response)

  const crumbs = computed(() => [
    {
      text: taskRun.value?.name ?? '',
      to: taskRunId.value ? routes.taskRun(taskRunId.value) : '',
    },
  ])

  function closePanel(): void {
    emit('dismiss')
  }
</script>

<style>
.task-run-panel { @apply
  border
  dark:border-background-600
  bg-background-800
  dark:bg-background
  w-full
  h-full
  p-4
  rounded-lg
  overflow-auto
}

.task-run-panel__details { @apply
  flex
  flex-col
  gap-3
}

.task-run-panel__tags .p-tag,
.task-run-panel__state-badge .p-tag { @apply
  !text-xs
}
</style>
