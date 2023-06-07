<template>
  <div class="dashboard-work-pool-card">
    <div class="dashboard-work-pool-card__header-row">
      <DashboardWorkPoolCardHeading :work-pool="workPool" />
    </div>
    <dl class="dashboard-work-pool-card__details">
      <DashboardWorkPoolCardDetail label="Polled">
        {{ lastPolled }}
      </DashboardWorkPoolCardDetail>
      <DashboardWorkPoolCardDetail label="Late runs">
        {{ lateFlowRunsCount }}
      </DashboardWorkPoolCardDetail>
      <DashboardWorkPoolCardDetail label="Work Queues">
        <DashboardWorkPoolCardWorkQueues :work-pool="workPool" />
      </DashboardWorkPoolCardDetail>
      <DashboardWorkPoolCardDetail label="Complete Ratio">
        ------
      </DashboardWorkPoolCardDetail>
    </dl>
  </div>
</template>

<script lang="ts" setup>
  import { useNow, useSubscription } from '@prefecthq/vue-compositions'
  import max from 'date-fns/max'
  import { computed } from 'vue'
  import DashboardWorkPoolCardDetail from '@/components/DashboardWorkPoolCardDetail.vue'
  import DashboardWorkPoolCardHeading from '@/components/DashboardWorkPoolCardHeading.vue'
  import DashboardWorkPoolCardWorkQueues from '@/components/DashboardWorkPoolCardWorkQueues.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRunsFilter, WorkPool } from '@/models'
  import { formatDateTimeRelative } from '@/utilities'

  const props = defineProps<{
    workPool: WorkPool,
  }>()


  const api = useWorkspaceApi()

  const subscriptionOptions = {
    interval: 30000,
  }
  const { now } = useNow({ interval: 1000 })

  const workPoolWorkersSubscription = useSubscription(api.workPoolWorkers.getWorkers, [props.workPool.name, {}], subscriptionOptions)
  const workPoolWorkers = computed(() => workPoolWorkersSubscription.response ?? [])
  const lastWorkerHeartbeat = computed(() => {
    const heartbeats = workPoolWorkers.value.map(worker => worker.lastHeartbeatTime)

    if (heartbeats.length === 0) {
      return null
    }

    return max(heartbeats)
  })
  const lastPolled = computed(() => {
    if (lastWorkerHeartbeat.value === null) {
      return 'N/A'
    }

    return formatDateTimeRelative(lastWorkerHeartbeat.value, now.value)
  })

  const lateFlowRunsFilter = computed<FlowRunsFilter>(() => ({
    workPools: {
      name: [props.workPool.name],
    },
    flowRuns: {
      state: {
        name: ['Late'],
      },
    },
  }))
  const lateFlowRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [lateFlowRunsFilter], subscriptionOptions)
  const lateFlowRunsCount = computed(() => lateFlowRunsCountSubscription.response ?? 0)
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
