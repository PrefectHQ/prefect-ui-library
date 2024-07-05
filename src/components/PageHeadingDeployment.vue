<template>
  <page-heading class="page-heading-deployment" :crumbs="crumbs">
    <DeploymentRelationships :deployment="deployment" />

    <template #actions>
      <RunMenu v-if="deployment.can.run && media.sm" :deployment="deployment" />
      <DeploymentMenu :deployment="deployment" :show-all="!media.sm" @delete="handleDelete" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { DeploymentRelationships, PageHeading, RunMenu } from '@/components'
  import { useComponent, useWorkspaceRoutes } from '@/compositions'
  import { Deployment } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const router = useRouter()
  const routes = useWorkspaceRoutes()
  const { DeploymentMenu } = useComponent()

  const crumbs = computed(() => [
    { text: 'Deployments', to: routes.deployments() },
    { text: props.deployment.name },
  ])

  const handleDelete = (): void => {
    router.back()
  }
</script>