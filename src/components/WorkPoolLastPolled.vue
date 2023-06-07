<template>
  <span class="work-pool-last-polled">
    <template v-if="lastPolled">
      {{ lastPolled }}
    </template>
    <template v-else>
      <span class="work-pool-last-polled__no-poll">N/A</span>
    </template>
  </span>
</template>

<script lang="ts" setup>
  import { useNow, useSubscription } from '@prefecthq/vue-compositions'
  import max from 'date-fns/max'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkPool } from '@/models'
  import { mapper } from '@/services'
  import { WorkspaceDashboardFilter } from '@/types'
  import { formatDateTimeRelative } from '@/utilities'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: WorkspaceDashboardFilter,
  }>()

  const subscriptionOptions = {
    interval: 30000,
  }

  const api = useWorkspaceApi()
  const { now } = useNow({ interval: 1000 })

  const workPoolWorkersFilter = computed(() => mapper.map('WorkspaceDashboardFilter', props.filter, 'WorkPoolWorkersFilter'))
  const workPoolWorkersSubscription = useSubscription(
    api.workPoolWorkers.getWorkers,
    [props.workPool.name, workPoolWorkersFilter],
    subscriptionOptions,
  )
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
      return undefined
    }

    return formatDateTimeRelative(lastWorkerHeartbeat.value, now.value)
  })
</script>

<style>
.work-pool-last-polled__no-poll { @apply
  text-slate-500
}
</style>