<template>
  <page-heading class="page-heading-deployment-edit" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { Deployment } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Deployments', to: routes.deployments() },
    { text: props.deployment.name, to: routes.deployment(props.deployment.id) },
    { text: 'Edit' },
  ])
</script>
