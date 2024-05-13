<template>
  <p-combobox
    v-model="selected"
    :options
    :multiple
    allow-unknown-value
    empty-message="All resources"
    class="event-resource-combobox"
  />
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'

  const selected = defineModel<string | string[] | null | undefined>('selected', { required: true })

  const props = defineProps<{
    multiple?: boolean,
    additionalOptions?: RelatedResourceGroup[],
  }>()

  const api = useWorkspaceApi()

  const automationsSubscription = useSubscription(api.automations.getAutomations)
  const automations = computed(() => automationsSubscription.response ?? [])

  const blocksSubscription = useSubscription(api.blockDocuments.getBlockDocuments)
  const blocks = computed(() => blocksSubscription.response ?? [])

  const deploymentsSubscription = useSubscription(api.deployments.getDeployments)
  const deployments = computed(() => deploymentsSubscription.response ?? [])

  const flowsSubscription = useSubscription(api.flows.getFlows)
  const flows = computed(() => flowsSubscription.response ?? [])

  const workPoolsSubscription = useSubscription(api.workPools.getWorkPools)
  const workPools = computed(() => workPoolsSubscription.response ?? [])

  const workQueuesSubscription = useSubscription(api.workQueues.getWorkQueues, [{}])
  const workQueues = computed(() => workQueuesSubscription.response ?? [])

  type RelatedResourceGroup = {
    label: string,
    options: { label: string, value: string, type: string }[],
  }

  const options = computed<RelatedResourceGroup[]>(() => [
    {
      label: 'Automations',
      options: automations.value.map(automation => ({
        label: automation.name,
        value: `prefect-cloud.automation.${automation.id}`,
        type: 'automation',
      })),
    },
    {
      label: 'Blocks',
      options: blocks.value.map(block => ({
        label: block.name,
        value: `prefect.block-document.${block.id}`,
        type: 'block-document',
      })),
    },
    {
      label: 'Deployments',
      options: deployments.value.map(deployment => ({
        label: deployment.name,
        value: `prefect.deployment.${deployment.id}`,
        type: 'deployment',
      })),
    },
    {
      label: 'Flows',
      options: flows.value.map(flow => ({
        label: flow.name,
        value: `prefect.flow.${flow.id}`,
        type: 'flow',
      })),
    },
    {
      label: 'Work Pools',
      options: workPools.value.map(workPool => ({
        label: workPool.name,
        value: `prefect.work-pool.${workPool.id}`,
        type: 'work-pool',
      })),
    },
    {
      label: 'Work Queues',
      options: workQueues.value.map(workQueue => ({
        label: `${workQueue.workPoolName} > ${workQueue.name}`,
        value: `prefect.work-queue.${workQueue.id}`,
        type: 'work-queue',
      })),
    },
    ...props.additionalOptions ?? [],
  ])
</script>
