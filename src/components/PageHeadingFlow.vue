<template>
  <page-heading class="page-heading-flow" :crumbs="crumbs">
    <template #actions>
      <FlowMenu :flow="flow" @delete="deleteFlow" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FlowMenu from '@/components/FlowMenu.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Flow } from '@/models'
  import { useWorkspaceRoutes } from '@/router'

  const props = defineProps<{
    flow: Flow,
  }>()

  const emit = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Flows', to: routes.flows() },
    { text: props.flow.name },
  ])

  const deleteFlow = (id: string): void => {
    emit('delete', id)
  }
</script>