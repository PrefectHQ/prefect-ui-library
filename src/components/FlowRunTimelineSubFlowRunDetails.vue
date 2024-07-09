<template>
  <div v-if="flowRun">
    <p-bread-crumbs class="flow-run-timeline-sub-flow-run-details__heading" :crumbs="crumbs" />
    <div class="flow-run-timeline-sub-flow-run-details__content">
      <p-key-value label="State" :alternate="alternate">
        <template #value>
          <StateBadge :state="flowRun.state" class="timeline-task-details__state-badge" />
        </template>
      </p-key-value>

      <p-key-value label="Flow Run ID" :value="flowRun.id" :alternate="alternate" />

      <p-key-value label="Duration" :alternate="alternate">
        <template #value>
          <DurationIconText :duration="flowRun.duration" />
        </template>
      </p-key-value>

      <p-key-value label="Created" :alternate="alternate">
        <template #value>
          <FormattedDate :date="flowRun.created" format="numeric" />
        </template>
      </p-key-value>

      <p-key-value label="Tags" :alternate="alternate">
        <template v-if="flowRun.tags?.length" #value>
          <p-tags :tags="flowRun.tags!" class="flow-run-timeline-sub-flow-run-details__tags" />
        </template>
      </p-key-value>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import { computed, toRefs } from 'vue'
  import { StateBadge, DurationIconText } from '@/components'
  import FormattedDate from '@/components/FormattedDate.vue'
  import { useFlow, useFlowRun, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const { flowRunId } = toRefs(props)

  const alternate = true

  const routes = useWorkspaceRoutes()

  const { flowRun } = useFlowRun(flowRunId)

  const flowId = computed(() => flowRun.value?.flowId)
  const { flow } = useFlow(flowId)

  const crumbs = computed<BreadCrumbs>(() => {
    const internalCrumbs: BreadCrumbs = []

    if (flow.value?.name) {
      internalCrumbs.push({
        text: flow.value.name,
        to: routes.flow(flow.value.id),
      })
    }

    if (flowRun.value?.name) {
      internalCrumbs.push({
        text: flowRun.value.name,
        to: routes.flowRun(flowRun.value.id),
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
