<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    workPoolName: string,
  }>()

  const routes = useWorkspaceRoutes()


  const crumbs = [
    { text: 'Work Pools', to: routes.workPools() },
    { text: props.workPoolName, to: routes.workPool(props.workPoolName) },
    { text: 'Create' },
  ]
</script>