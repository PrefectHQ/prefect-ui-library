<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueueName: string,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Work Pools', to: routes.workPools() },
    { text: props.workPoolName, to: routes.workPool(props.workPoolName) },
    { text: props.workPoolQueueName, to: routes.workPoolQueue(props.workPoolName, props.workPoolQueueName) },
    { text: 'Edit' },
  ])
</script>