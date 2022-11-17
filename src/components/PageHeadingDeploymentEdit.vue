<template>
  <page-heading class="page-heading-deployment-edit" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Deployment } from '@/models'
  import { deploymentRouteKey, deploymentsRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const deploymentsRoute = inject(deploymentsRouteKey)

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const deploymentRoute = inject(deploymentRouteKey)

  const crumbs = computed(() => [
    { text: 'Deployments', to: deploymentsRoute() },
    { text: props.deployment.name, to: deploymentRoute(props.deployment.id) },
    { text: 'Edit' },
  ])
</script>
