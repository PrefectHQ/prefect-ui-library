<template>
  <div class="flow-run-meta-well">
    <StateBadge :state="flowRunMeta.state" class="flow-run-meta-well__badge" />

    <p-icon-text icon="ClockIcon">
      <span>{{ flowRunMeta.duration }}</span>
    </p-icon-text>

    <p-icon-text icon="CalendarIcon">
      <span>Started on {{ flowRunMeta.startTime }}</span>
    </p-icon-text>

    <router-link :to="`/flows/${flowRunMeta.flowId}`">
      <p-icon-text icon="Flow">
        <span>{{ flowName }}</span>
      </p-icon-text>
    </router-link>

    <template v-if="flowRunMeta.deploymentId">
      <router-link :to="`/deployments/${flowRunMeta.deploymentId}`">
        <p-icon-text icon="LocationMarkerIcon">
          <span>{{ deploymentName }}</span>
        </p-icon-text>
      </router-link>
    </template>

    <p-key-value label="Flow Run ID" :value="flowRunMeta.id" />

    <p-key-value label="Flow ID" :value="flowRunMeta.flowId" />

    <template v-if="flowRunMeta.deploymentId">
      <p-key-value label="Deployment ID" :value="flowRunMeta.deploymentId" />
    </template>

    <p-key-value label="Created">
      <template #value>
        {{ flowRunMeta.created }}
      </template>
    </p-key-value>

    <template v-if="flowRunMeta.flowVersion">
      <p-key-value label="Flow Version" :value="flowRunMeta.flowVersion" />
    </template>

    <template v-if="flowRunMeta.idempotencyKey">
      <p-key-value label="Idempotency Key" :value="flowRunMeta.idempotencyKey" />
    </template>

    <p-key-value label="Run Count" :value="flowRunMeta.runCount ? flowRunMeta.runCount : 0" />

    <p-key-value label="Flow Runner">
      <template #value>
        <slot name="flow-runner">
          --
        </slot>
      </template>
    </p-key-value>

    <template v-if="flowRunMeta.tags">
      <p-key-value label="Tags">
        <template #value>
          <p-tag v-for="tag in flowRunMeta.tags" :key="tag" class="flow-run-meta-well__tags">
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
  import StateBadge from '@/components/StateBadge.vue'
  import { FlowRun } from '@/models/FlowRun'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { flowsApiKey } from '@/services/FlowsApi'
  import { inject } from '@/utilities/inject'


  const props = defineProps<{
    flowRunMeta: FlowRun,
  }>()

  const flowsApi = inject(flowsApiKey)
  const flowsSubscription = useSubscription(flowsApi.getFlow, [props.flowRunMeta.flowId])
  const flowName = computed(() => flowsSubscription.response?.name)

  const deploymentsApi = inject(deploymentsApiKey)
  const deploymentsSubscription = useSubscription(deploymentsApi.getDeployment, [props.flowRunMeta.deploymentId!])
  const deploymentName = computed(() => deploymentsSubscription.response?.name)
</script>

<style>
  .flow-run-meta-well {
    @apply
    flex
    flex-col
    gap-3
  }

  .flow-run-meta-well__badge {
    @apply
    h-6
    w-max
  }

  .flow-run-meta-well__tags {
    @apply
    mb-1
    mr-1
  }
</style>