<template>
  <StateListItem class="deployment-list-item" :tags="tags" :state-type="deploymentState" disabled>
    <template #name>
      <p-link :to="routes.deployment(deployment.id)">
        <p-heading :heading="5">
          {{ deployment.name }}
        </p-heading>
      </p-link>
    </template>

    <template #relationships>
      <ListItemMetaFlowRun :title="localization.info.lastRun" :flow-run="lastRun" />
    </template>

    <template v-if="deployment.workPoolName || deployment.workQueueName" #meta>
      <template v-if="deployment.workPoolName">
        <ListItemMeta :title="localization.info.workPool">
          <WorkPoolIconText :work-pool-name="deployment.workPoolName" />
        </ListItemMeta>
      </template>

      <template v-else-if="deployment.workQueueName">
        <ListItemMeta :title="localization.info.workQueue">
          <WorkQueueIconText :work-queue-name="deployment.workQueueName" />
        </ListItemMeta>
      </template>
    </template>

    <template #action>
      <DeploymentMenu size="xs" :deployment="deployment" show-all @delete="refresh" />
    </template>

    <div class="deployment-list-item__schedule">
      <DeploymentToggle :deployment="deployment" :disabled="!schedule" @update="refresh" />

      <div class="deployment-list-item__schedule-icon-text">
        <p-icon icon="ClockIcon" />

        <template v-if="schedule">
          <div class="deployment-list-item__schedule-text">
            <span :title="schedule?.toString({ verbose: true })">{{ scheduleText }}</span>
          </div>
        </template>

        <template v-else>
          <div class="deployment-list-item__schedule-none">
            {{ localization.info.noSchedule }}
          </div>
        </template>
      </div>
    </div>
  </StateListItem>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { DeploymentMenu, DeploymentToggle, ListItemMeta, ListItemMetaFlowRun, StateListItem, WorkPoolIconText, WorkQueueIconText } from '@/components'
  import { useLastFlowRun, useNextFlowRun, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment, FlowRunsFilter, isRRuleSchedule } from '@/models'

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

  const schedule = computed(() => props.deployment.schedule)
  const scheduleText = computed(() => {
    if (isRRuleSchedule(schedule.value)) {
      return 'RRule'
    }

    return schedule.value?.toString() ?? ''
  })

  const refresh = (): void => {
    // TODO: impelement
  }
</script>

<style>
.deployment-list-item__schedule { @apply
  text-foreground
  flex
  gap-2
  items-center
  text-sm
  font-normal
  mt-2
}

.deployment-list-item__schedule-icon-text { @apply
  flex
  gap-1
  items-center
}

.deployment-list-item__schedule-none { @apply
  text-foreground-100
}
</style>