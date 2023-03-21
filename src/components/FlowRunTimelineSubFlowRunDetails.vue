<template>
  <template v-if="subFlowRun">
    <page-heading :crumbs="crumbs" size="sm" class="mb-2">
      <template #actions>
        <slot />
      </template>
    </page-heading>
    <div class="timeline-sub-flow-details__content">
      <p-key-value label="State" :alternate="alternate">
        <template #value>
          <StateBadge :state="subFlowRun.state" class="timeline-task-details__state-badge" />
        </template>
      </p-key-value>
      <p-key-value label="Flow Run ID" :value="subFlowRun.id" :alternate="alternate" />
      <p-key-value label="Duration" :alternate="alternate">
        <template #value>
          <DurationIconText :duration="subFlowRun.duration" />
        </template>
      </p-key-value>
      <p-key-value label="Created" :value="formatDateTimeNumeric(subFlowRun.created)" :alternate="alternate" />
      <p-key-value label="Tags" :alternate="alternate">
        <template v-if="subFlowRun.tags?.length" #value>
          <p-tags :tags="subFlowRun.tags!" class="timeline-sub-flow-details__tags" />
        </template>
      </p-key-value>
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import { StateBadge, PageHeading, DurationIconText } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    id: string,
  }>()

  const { id } = toRefs(props)

  const alternate = true

  const routes = useWorkspaceRoutes()
  const api = useWorkspaceApi()
  const flowRunSubscriptionArgs = computed<[string]>(() => [id.value])
  const flowRunSubscription = useSubscriptionWithDependencies(
    api.flowRuns.getFlowRun,
    flowRunSubscriptionArgs,
  )

  const subFlowRun = computed(() => flowRunSubscription.response)

  const crumbs = computed(() => {
    return [
      {
        text: subFlowRun.value?.name ?? '',
        to: routes.flowRun(id.value),
      },
    ]
  })
</script>

<style>
.timeline-sub-flow-details__content { @apply
  flex
  flex-col
  gap-3
}

.timeline-sub-flow-details__tags .p-tag,
.timeline-sub-flow-details__state-badge .p-tag { @apply
  !text-xs
}
</style>
