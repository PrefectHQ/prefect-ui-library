<template>
  <template v-if="workPool?.can.read">
    <p-link :to="routes.workPool(workPoolName)" class="work-pool-icon-text">
      <p-icon-text icon="PWorkPool">
        <span>{{ workPoolName }}</span>
      </p-icon-text>
    </p-link>
  </template>
  <template v-else>
    <span>
      No access
    </span>
  </template>
</template>

<script lang="ts" setup>
  import { useWorkPool, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    workPoolName: string,
  }>()

  const routes = useWorkspaceRoutes()
  const { workPool } = useWorkPool(() => props.workPoolName)
</script>