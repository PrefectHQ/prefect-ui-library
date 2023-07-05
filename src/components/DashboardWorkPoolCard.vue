<template>
  <div class="dashboard-work-pool-card">
    <div class="dashboard-work-pool-card__header">
      <p-link :to="routes.workPool(workPool.name)">
        {{ workPool.name }}
      </p-link>
      <FlowRunsBarChart
        class="dashboard-work-pool-card__mini-bars"
        mini
        :filter="flowRunsFilter"
      />
    </div>
    <dl class="dashboard-work-pool-card__details">
      <DashboardWorkPoolCardDetail label="Polled">
        <WorkPoolLastPolled :work-pool="workPool" :filter="filter" />
      </DashboardWorkPoolCardDetail>

      <DashboardWorkPoolCardDetail label="Work Queues">
        <WorkPoolQueueStatusArray :work-pool="workPool" />
      </DashboardWorkPoolCardDetail>

      <DashboardWorkPoolCardDetail label="Late runs">
        <WorkPoolLateCount :work-pool="workPool" :filter="flowRunsFilter" />
      </DashboardWorkPoolCardDetail>

      <DashboardWorkPoolCardDetail label="Avg. Late time">
        <WorkPoolAverageLateTime :work-pool="workPool" :filter="flowRunsFilter" />
      </DashboardWorkPoolCardDetail>

      <DashboardWorkPoolCardDetail label="Total runs">
        <DashboardWorkPoolFlowRunsTotal :work-pool="workPool" :filter="filter" />
      </DashboardWorkPoolCardDetail>

      <DashboardWorkPoolCardDetail label="Completes">
        <DashboardWorkPoolFlowRunCompletes :work-pool="workPool" :filter="filter" />
      </DashboardWorkPoolCardDetail>
    </dl>
  </div>
</template>

<script lang="ts" setup>
  import merge from 'lodash.merge'
  import { computed } from 'vue'
  import DashboardWorkPoolCardDetail from '@/components/DashboardWorkPoolCardDetail.vue'
  import DashboardWorkPoolFlowRunCompletes from '@/components/DashboardWorkPoolFlowRunCompletes.vue'
  import DashboardWorkPoolFlowRunsTotal from '@/components/DashboardWorkPoolFlowRunsTotal.vue'
  import FlowRunsBarChart from '@/components/FlowRunsBarChart.vue'
  import WorkPoolAverageLateTime from '@/components/WorkPoolAverageLateTime.vue'
  import WorkPoolLastPolled from '@/components/WorkPoolLastPolled.vue'
  import WorkPoolLateCount from '@/components/WorkPoolLateCount.vue'
  import WorkPoolQueueStatusArray from '@/components/WorkPoolQueueStatusArray.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { FlowRunsFilter, WorkPool } from '@/models'
  import { mapper } from '@/services'
  import { WorkspaceDashboardFilter } from '@/types'

  const props = defineProps<{
    workPool: WorkPool,
    filter: WorkspaceDashboardFilter,
  }>()

  const routes = useWorkspaceRoutes()

  const flowRunsFilter = computed<FlowRunsFilter>(() => {
    const baseFilter = mapper.map('WorkspaceDashboardFilter', props.filter, 'FlowRunsFilter')

    const workPoolFilter: FlowRunsFilter = {
      workPools: {
        id: [props.workPool.id],
      },
    }

    return merge(baseFilter, workPoolFilter)
  })
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
  justify-between
  align-middle
  p-3
  border-b
  border-slate-200
  dark:border-slate-700
}

.dashboard-work-pool-card__mini-bars { @apply
  w-1/5
  h-6
}

.dashboard-work-pool-card__details { @apply
  p-3
  flex
  justify-between
}
</style>
