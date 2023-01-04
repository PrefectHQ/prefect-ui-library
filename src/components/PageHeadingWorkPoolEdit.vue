<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { WorkPool } from '@/models'

  const props = defineProps<{
    workPool: WorkPool,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Work Pools', to: routes.workPools() },
    { text: props.workPool.name, to: routes.workPool(props.workPool.name) },
    { text: 'Edit' },
  ])
</script>