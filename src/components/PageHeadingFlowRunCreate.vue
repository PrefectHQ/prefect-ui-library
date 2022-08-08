<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from './PageHeading.vue'
  import { Deployment } from '@/models'
  import { deploymentRouteKey, deploymentsRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const deploymentsRoute = inject(deploymentsRouteKey)
  const deploymentRoute = inject(deploymentRouteKey)

  const crumbs = computed(() => [
    { text: 'Deployments', to: deploymentsRoute() },
    { text: props.deployment.name, to: deploymentRoute(props.deployment.id) },
    { text: 'Run' },
  ])
</script>