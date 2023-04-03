<template>
  <div v-if="subFlowRun">
    <p-bread-crumbs class="flow-run-timeline-sub-flow-run-details__heading" :crumbs="crumbs" />
    <div class="flow-run-timeline-sub-flow-run-details__content">
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
          <p-tags :tags="subFlowRun.tags!" class="flow-run-timeline-sub-flow-run-details__tags" />
        </template>
      </p-key-value>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import { StateBadge, DurationIconText } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const { flowRunId } = toRefs(props)

  const alternate = true

  const routes = useWorkspaceRoutes()
  const api = useWorkspaceApi()

  const flowRunSubscriptionArgs = computed<[string]>(() => [flowRunId.value])
  const flowRunSubscription = useSubscriptionWithDependencies(
    api.flowRuns.getFlowRun,
    flowRunSubscriptionArgs,
  )

  const subFlowRun = computed(() => flowRunSubscription.response)

  const flowSubscriptionArgs = computed<[string]>(() => [flowRunSubscription.response?.flowId || ''])
  const flowSubscription = useSubscriptionWithDependencies(
    api.flows.getFlow,
    flowSubscriptionArgs,
  )

  const flow = computed(() => flowSubscription.response)

  const crumbs = computed<BreadCrumbs>(() => {
    const internalCrumbs: BreadCrumbs = []

    if (flow.value?.name) {
      internalCrumbs.push({
        text: flow.value.name,
        to: routes.flow(flow.value.id),
      })
    }

    if (subFlowRun.value?.name) {
      internalCrumbs.push({
        text: subFlowRun.value.name,
        to: routes.flowRun(subFlowRun.value.id),
      })
    }

    return internalCrumbs
  })
</script>

<style>
.flow-run-timeline-sub-flow-run-details__heading { @apply
  text-base
}

.flow-run-timeline-sub-flow-run-details__content { @apply
  mt-2
  flex
  flex-col
  gap-3
}

.flow-run-timeline-sub-flow-run-details__tags .p-tag,
.flow-run-timeline-sub-flow-run-details__state-badge .p-tag { @apply
  !text-xs
}
</style>
