<template>
  <p-card class="dashboard-work-pools-card">
    <p-heading heading="5" class="dashboard-work-pools-card__heading">
      Work Pools
    </p-heading>
    <template v-for="workPool in workPools" :key="workPool.id">
      <DashboardWorkPoolCard :work-pool="workPool" />
    </template>
    <div v-if="workPools.length === 0" class="dashboard-work-pools-card__empty">
      <p>
        There are no active work pools to show. Any work pools you do have are paused.
      </p>
      <p-link :to="routes.workPools()">
        View all work pools
      </p-link>
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import DashboardWorkPoolCard from '@/components/DashboardWorkPoolCard.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { WorkspaceDashboardFilter } from '@/types/dashboard'

  // TODO - Use this filter to filter the work pools content
  const props = defineProps<{
    filter: WorkspaceDashboardFilter,
  }>()

  const subscriptionOptions = {
    interval: 30000,
  }

  const routes = useWorkspaceRoutes()
  const api = useWorkspaceApi()

  const workPoolsSubscription = useSubscription(api.workPools.getWorkPools, [], subscriptionOptions)
  const workPools = computed(() => workPoolsSubscription.response?.filter(workPool => !workPool.isPaused) ?? [])
</script>

<style>
.dashboard-work-pools-card__heading { @apply
  mb-4
}

.dashboard-work-pools-card__empty { @apply
  text-center
  text-foreground-200
  text-sm
  my-8
}
</style>