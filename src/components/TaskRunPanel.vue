<template>
  <div v-if="taskRun" class="task-run-panel" :class="classes">
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
  </div>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref, toRefs } from 'vue'
  import { StateBadge, DurationIconText, PageHeading } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    showPanel: boolean,
    taskRunId: string,
  }>()

  const { taskRunId, showPanel } = toRefs(props)

  const classes = computed(() => ({
    'task-run-panel--open': taskRunId.value && showPanel.value,
  }))

  const alternate = ref(true)

  const emit = defineEmits<{
    (event: 'update:showPanel', value: boolean): void,
    (event: 'cancel'): void,
  }>()

  const internalValue = computed({
    get() {
      return showPanel.value
    },
    set(value: boolean) {
      emit('update:showPanel', value)
    },
  })

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const taskRunIdArgs = computed<[string] | null>(() => taskRunId.value ? [taskRunId.value] : null)
  const taskRunSubscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRun, taskRunIdArgs)
  const taskRun = computed(() => taskRunSubscription.response)

  const crumbs = computed(() => [{ text: taskRun.value?.name ?? '', to: routes.taskRun(taskRunId.value) }])

  function closePanel(): void {
    emit('cancel')
    internalValue.value = false
  }
</script>

<style>
.task-run-panel { @apply
  h-[350px]
  w-0
  py-4
  rounded-lg
  overflow-hidden
  transition-all
  duration-500
  opacity-0
}

.task-run-panel--open { @apply
  border
  dark:border-background-600
  w-96
  ml-2
  px-4
  opacity-100
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