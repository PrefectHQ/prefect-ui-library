<template>
  <page-heading class="page-heading-flow-collection" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    name: string,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Flows', to: routes.flows() },
    { text: 'Collections', to: routes.flowCollections() },
    { text: props.name },
  ])
</script>