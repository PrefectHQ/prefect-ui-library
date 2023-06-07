<template>
  <div class="dashboard-work-pool-card">
    <div class="dashboard-work-pool-card__header-row">
      <p-link :to="routes.workPool(workPool.name)">
        {{ workPool.name }}
      </p-link>
    </div>
    <dl class="dashboard-work-pool-card__details">
      <DashboardWorkPoolCardDetail label="Polled">
        <WorkPoolLastPolled :work-pool="workPool" :filter="filter" />
      </DashboardWorkPoolCardDetail>

      <DashboardWorkPoolCardDetail label="Late runs">
        <WorkPoolLateCount :work-pool="workPool" :filter="filter" />
      </DashboardWorkPoolCardDetail>

      <DashboardWorkPoolCardDetail label="Work Queues">
        <WorkPoolQueueStatusArray :work-pool="workPool" />
      </DashboardWorkPoolCardDetail>

      <DashboardWorkPoolCardDetail label="Completes">
        <WorkPoolFlowRunCompletePercentage :work-pool="workPool" :filter="filter" />
      </DashboardWorkPoolCardDetail>
    </dl>
  </div>
</template>

<script lang="ts" setup>
  import DashboardWorkPoolCardDetail from '@/components/DashboardWorkPoolCardDetail.vue'
  import WorkPoolFlowRunCompletePercentage from '@/components/WorkPoolFlowRunCompletePercentage.vue'
  import WorkPoolLastPolled from '@/components/WorkPoolLastPolled.vue'
  import WorkPoolLateCount from '@/components/WorkPoolLateCount.vue'
  import WorkPoolQueueStatusArray from '@/components/WorkPoolQueueStatusArray.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { WorkPool } from '@/models'
  import { WorkspaceDashboardFilter } from '@/types'

  defineProps<{
    workPool: WorkPool,
    filter: WorkspaceDashboardFilter,
  }>()

  const routes = useWorkspaceRoutes()
</script>

<style>
.dashboard-work-pool-card { @apply
  border
  border-slate-200
  dark:border-slate-700
  rounded-xl
}

.dashboard-work-pool-card__header-row { @apply
  p-3
  border-b
  border-slate-200
  dark:border-slate-700
}

.dashboard-work-pool-card__details { @apply
  p-3
  flex
  justify-between
}
</style>
