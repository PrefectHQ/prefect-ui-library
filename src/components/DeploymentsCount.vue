<template>
  <template v-if="count">
    <span class="deployments-count">{{ count }} {{ toPluralString(localization.info.deployment, count) }}</span>
  </template>
  <template v-else>
    <span class="deployments-count--none">{{ localization.info.none }}</span>
  </template>
</template>

<script lang="ts" setup>
  import { toPluralString } from '@prefecthq/prefect-design'
  import { useDeploymentsCount } from '@/compositions'
  import { localization } from '@/localization'

  const props = defineProps<{
    flowId: string,
  }>()

  const { count } = useDeploymentsCount(() => ({
    flows: {
      id: [props.flowId],
    },
  }))
</script>

<style>
.deployments-count--none { @apply
  text-subdued
}
</style>