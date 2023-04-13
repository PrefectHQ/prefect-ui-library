<template>
  <StateListItem class="deployment-list-item" :tags="tags" :state="deploymentState">
    <template #name>
      <p-link :to="routes.deployment(deployment.id)">
        <p-heading :heading="5">
          {{ deployment.name }}
        </p-heading>
      </p-link>
    </template>

    <template #meta>
      <template v-if="lastRun">
        <ListItemMetaFlowRun :title="localization.info.lastRun" :flow-run="lastRun" />
      </template>
      <template v-if="nextRun">
        <ListItemMetaFlowRun :title="localization.info.nextRun" :flow-run="nextRun" />
      </template>
    </template>

    <template #relationships>
      <template v-if="deployment.workPoolName">
        <div class="deployment-list-item__relation">
          <span>{{ localization.info.workPool }}</span> <WorkPoolIconText :work-pool-name="deployment.workPoolName" />
        </div>
      </template>

      <template v-if="deployment.workQueueName">
        <div class="deployment-list-item__relation">
          <span>{{ localization.info.workQueue }} </span> <WorkQueueIconText :work-queue-name="deployment.workQueueName" :work-pool-name="deployment.workPoolName" />
        </div>
      </template>
    </template>
  </StateListItem>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { ListItemMetaFlowRun, StateListItem, WorkPoolIconText, WorkQueueIconText } from '@/components'
  import { useLastFlowRun, useNextFlowRun, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment, FlowRunsFilter } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const routes = useWorkspaceRoutes()
  const tags = computed(() => props.deployment.tags ?? [])

  const flowRunsFilter = computed<FlowRunsFilter>(() => {
    return {
      deployments: {
        id: [props.deployment.id],
      },
    }
  })

  const { flowRun: nextRun } = useNextFlowRun(flowRunsFilter)
  const { flowRun: lastRun } = useLastFlowRun(flowRunsFilter)

  const deploymentState = computed(() => {
    return lastRun.value?.state?.type ?? nextRun.value?.state?.type ?? undefined
  })
</script>

<style>
.deployment-list-item .state-list-item__meta { @apply
  gap-8
}
</style>