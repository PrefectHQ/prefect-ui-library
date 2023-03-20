<template>
  <div class="task-run-panel">
    <template v-if="data">
      <div class="flex justify-between items-start w-full">
        <page-heading :crumbs="crumbs" size="sm">
          <template #after-crumbs>
            <StateBadge :state="data.state" class="task-run-panel__state-badge" />
          </template>
        </page-heading>
        <p-button size="xs" icon="XIcon" flat @click="closePanel" />
      </div>

      <p-divider />

      <div class="task-run-panel__details">
        <p-key-value label="ID" :value="data.id" :alternate="alternate" />
        <p-key-value label="Duration" :alternate="alternate">
          <template #value>
            <DurationIconText :duration="data.duration" />
          </template>
        </p-key-value>
        <p-key-value label="Created" :value="formatDateTimeNumeric(data.created)" :alternate="alternate" />
        <p-key-value label="Tags" :alternate="alternate">
          <template v-if="data.tags?.length" #value>
            <p-tags :tags="data.tags!" class="task-run-panel__tags" />
          </template>
        </p-key-value>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { NodeSelectionEventTypes } from '@prefecthq/graphs'
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, toRefs, watch } from 'vue'
  import { StateBadge, DurationIconText, PageHeading } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    id: string | null,
    type: NodeSelectionEventTypes,
  }>()

  const { id, type } = toRefs(props)

  const alternate = true

  const emit = defineEmits<{
    (event: 'dismiss'): void,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const subscriptionArgs = computed<[string] | null>(() => id.value ? [id.value] : null)

  let dataSubscription = assignSubscription()

  function assignSubscription(): ReturnType<typeof useSubscriptionWithDependencies> {
    return useSubscriptionWithDependencies(
      type.value === 'task'
        ? api.taskRuns.getTaskRun
        : api.flowRuns.getFlowRun,
      subscriptionArgs,
    )
  }

  watch(type, () => {
    dataSubscription.unsubscribe()
    dataSubscription = assignSubscription()
  })

  const data = computed(() => dataSubscription.response)

  const crumbs = computed(() => {
    if (!id.value) {
      return []
    }

    const to = type.value === 'task'
      ? routes.taskRun(id.value)
      : routes.flowRun(id.value)

    return [
      {
        text: data.value?.name ?? '',
        to,
      },
    ]
  })

  function closePanel(): void {
    emit('dismiss')
  }
</script>

<style>
.task-run-panel { @apply
  border
  dark:border-background-600
  bg-background
  bg-opacity-80
  backdrop-blur
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
