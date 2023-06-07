<template>
  <div class="dashboard-work-pool-card-heading">
    <p-link :to="routes.workPool(workPool.name)">
      {{ workPool.name }}
    </p-link>
  </div>
</template>

<script lang="ts" setup>
  import { useWorkspaceRoutes } from '..'
  import { WorkPool } from '@/models'

  defineProps<{
    workPool: WorkPool,
  }>()

  const routes = useWorkspaceRoutes()
</script>

<style>
.dashboard-work-pool-card-heading { @apply
  flex
  flex-wrap
  items-center
  gap-2
}
</style>
