<template>
  <StateListItem class="deployment-list-item" :tags="tags" :state="deploymentState">
    <template #name>
      <p-link :to="routes.deployment(deployment.id)">
        <p-heading :heading="5">
          {{ deployment.name }}
        </p-heading>
      </p-link>

      <div class="deployment-list-item__schedule">
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
    console.log(schedule.value, schedule.value?.toString())
    if (isRRuleSchedule(schedule.value)) {
      return 'RRule'
    }

    return schedule.value?.toString() ?? ''
  })
</script>

<style>
.deployment-list-item .state-list-item__meta { @apply
  gap-8
}

.deployment-list-item__relation { @apply
  flex
  gap-2
}

.deployment-list-item__schedule { @apply
  text-foreground
  flex
  gap-1
  items-center
  text-sm
}

.deployment-list-item__schedule-text { @apply
  font-bold
}

.deployment-list-item__schedule-none { @apply
  text-foreground-100
  font-normal
}
</style>