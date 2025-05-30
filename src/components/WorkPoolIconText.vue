<template>
  <template v-if="workPool?.can.read">
    <template v-if="workPool">
      <p-link :to="routes.workPool(workPoolName)" class="work-pool-icon-text">
        <p-icon-text icon="PWorkPool">
          <div class="work-pool-icon-name">
            {{ workPoolName }}
          </div>
        </p-icon-text>
      </p-link>
    </template>
    <template v-else-if="subscription.executed">
      <span>
        Work pool not found
      </span>
    </template>
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
  const { workPool, subscription } = useWorkPool(() => props.workPoolName)
</script>

<style>
.work-pool-icon-name { @apply
  truncate
  max-w-48
  block
}
</style>