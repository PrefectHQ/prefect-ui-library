<template>
  <div class="flow-run-meta-well">
    <StateBadge :state="flowRun.state" />

    <p-icon-text icon="ClockIcon">
      <span>{{ secondsToApproximateString(flowRun.duration) }}</span>
    </p-icon-text>

    <FlowRunStartTime :flow-run="flowRun" />

    <router-link :to="flowRoute(flowRun.flowId)">
      <p-icon-text icon="Flow">
        <span>{{ flowName }}</span>
      </p-icon-text>
    </router-link>

    <template v-if="flowRun.deploymentId">
      <router-link :to="deploymentRoute(flowRun.deploymentId)">
        <p-icon-text icon="LocationMarkerIcon">
          <span>{{ deploymentName }}</span>
        </p-icon-text>
      </router-link>
    </template>

    <hr class="flow-run-meta-well__divider">

    <p-key-value label="Flow Run ID" :value="flowRun.id" />

    <p-key-value label="Flow ID" :value="flowRun.flowId" />

    <template v-if="flowRun.deploymentId">
      <p-key-value label="Deployment ID" :value="flowRun.deploymentId" />
    </template>

    <p-key-value label="Created" :value="formatDateTimeNumeric(flowRun.created)" />

    <template v-if="flowRun.flowVersion">
      <p-key-value label="Flow Version" :value="flowRun.flowVersion" />
    </template>

    <template v-if="flowRun.idempotencyKey">
      <p-key-value label="Idempotency Key" :value="flowRun.idempotencyKey" />
    </template>

    <p-key-value label="Run Count" :value="flowRun.runCount ?? 0" />

    <template v-if="flowRun.flowRunner">
      <p-key-value label="Flow Runner" :value="flowRun.flowRunner?.type" />
    </template>

    <template v-if="flowRun.tags">
      <p-key-value label="Tags">
        <template #value>
          <p-tag v-for="tag in flowRun.tags" :key="tag" class="flow-run-meta-well__tags">
            {{ tag }}
          </p-tag>
        </template>
      </p-key-value>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { FlowRun } from '@/models/FlowRun'
  import { deploymentRouteKey, flowRouteKey } from '@/router'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { flowsApiKey } from '@/services/FlowsApi'
  import { formatDateTimeNumeric } from '@/utilities/dates'
  import { inject } from '@/utilities/inject'
  import { secondsToApproximateString } from '@/utilities/seconds'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const flowsApi = inject(flowsApiKey)
  const flowsSubscription = useSubscription(flowsApi.getFlow, [props.flowRun.flowId])
  const flowName = computed(() => flowsSubscription.response?.name)

  const deploymentsApi = inject(deploymentsApiKey)
  const deploymentId = computed(() => props.flowRun.deploymentId ?? '')
  const deploymentsSubscription = useSubscription(deploymentsApi.getDeployment, [deploymentId])
  const deploymentName = computed(() => deploymentsSubscription.response?.name)

  const deploymentRoute = inject(deploymentRouteKey)
  const flowRoute = inject(flowRouteKey)
</script>

<style>
  .flow-run-meta-well {
    @apply
    flex
    flex-col
    gap-3
    items-start
  }

  .flow-run-meta-well__divider {
    @apply
    border-none
    h-[1px]
    bg-slate-200
    w-full
  }

  .flow-run-meta-well__tags {
    @apply
    mb-1
    mr-1
  }
</style>