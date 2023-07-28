<template>
  <div class="dashboard-work-pool-card">
    <div class="dashboard-work-pool-card__header">
      <p-link class="dashboard-work-pool-card__name" :to="routes.workPool(workPool.name)">
        {{ workPool.name }}
      </p-link>
      <FlowRunsBarChart
        class="dashboard-work-pool-card__mini-bars"
        mini
        :filter="flowRunsFilter"
      />
      <DashboardWorkPoolFlowRunsTotal :work-pool="workPool" :filter="flowRunsFilter" />
    </div>
    <dl class="dashboard-work-pool-card__details">
      <DashboardWorkPoolCardDetail label="Polled">
        <WorkPoolLastPolled :work-pool="workPool" />
      </DashboardWorkPoolCardDetail>

      <DashboardWorkPoolCardDetail label="Work Queues">
        <WorkPoolQueueStatusArray :work-pool="workPool" />
      </DashboardWorkPoolCardDetail>

      <DashboardWorkPoolCardDetail label="Late runs">
        <div class="dashboard-work-pool-card__late-runs">
          <DashboardWorkPoolLateCount :work-pool="workPool" :filter="flowRunsFilter" />
          <WorkPoolAverageLateTime :work-pool="workPool" :filter="flowRunsFilter" />
        </div>
      </DashboardWorkPoolCardDetail>

      <DashboardWorkPoolCardDetail label="Completes">
        <DashboardWorkPoolFlowRunCompleteness :work-pool="workPool" :filter="flowRunsFilter" />
      </DashboardWorkPoolCardDetail>
    </dl>
  </div>
</template>

<script lang="ts" setup>
  import merge from 'lodash.merge'
  import DashboardWorkPoolCardDetail from '@/components/DashboardWorkPoolCardDetail.vue'
  import DashboardWorkPoolFlowRunCompleteness from '@/components/DashboardWorkPoolFlowRunCompleteness.vue'
  import DashboardWorkPoolFlowRunsTotal from '@/components/DashboardWorkPoolFlowRunsTotal.vue'
  import DashboardWorkPoolLateCount from '@/components/DashboardWorkPoolLateCount.vue'
  import FlowRunsBarChart from '@/components/FlowRunsBarChart.vue'
  import WorkPoolAverageLateTime from '@/components/WorkPoolAverageLateTime.vue'
  import WorkPoolLastPolled from '@/components/WorkPoolLastPolled.vue'
  import WorkPoolQueueStatusArray from '@/components/WorkPoolQueueStatusArray.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { FlowRunsFilter, WorkPool } from '@/models'
  import { mapper } from '@/services'
  import { Getter, WorkspaceDashboardFilter } from '@/types'

  const props = defineProps<{
    workPool: WorkPool,
    filter: WorkspaceDashboardFilter,
  }>()

  const routes = useWorkspaceRoutes()

  const flowRunsFilter: Getter<FlowRunsFilter> = () => {
    const base = mapper.map('WorkspaceDashboardFilter', props.filter, 'FlowRunsFilter')

    const filter: FlowRunsFilter = {
      workPools: {
        id: [props.workPool.id],
      },
    }

    return merge({}, base, filter)
  }
</script>

<style>
.dashboard-work-pool-card { @apply
  border
  border-slate-200
  dark:border-slate-700
  rounded-xl
}

.dashboard-work-pool-card__header { @apply
  flex
  items-center
  gap-4
  p-3
  border-b
  border-slate-200
  dark:border-slate-700
}

.dashboard-work-pool-card__name { @apply
  flex-grow
}

.dashboard-work-pool-card__mini-bars { @apply
  w-1/5
  h-6
}

.dashboard-work-pool-card__details { @apply
  p-3
  grid
  grid-cols-4
  gap-y-2
}

.dashboard-work-pool-card__late-runs { @apply
  inline-flex
  items-center
  gap-1
}
</style>
