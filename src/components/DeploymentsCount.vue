<template>
  <template v-if="count">
    <p-link class="deployments-count" :to="withQuery(routes.flow(flowId), { tab: 'Deployments' })">
      {{ count }} {{ toPluralString(localization.info.deployment, count) }}
    </p-link>
  </template>
  <template v-else>
    <span class="deployments-count--none">{{ localization.info.none }}</span>
  </template>
</template>

<script lang="ts" setup>
  import { toPluralString } from '@prefecthq/prefect-design'
  import { useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { withQuery } from '@/utilities'

  defineProps<{
    count: number,
    flowId: string,
  }>()

  const routes = useWorkspaceRoutes()
</script>

<style>
.deployments-count--none { @apply
  text-subdued
}
</style>