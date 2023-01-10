<template>
  <page-heading class="page-heading-flow" :crumbs="crumbs">
    <template #actions>
      <FlowMenu :flow="flow" @delete="deleteFlow" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useComponent, useWorkspaceRoutes } from '@/compositions'
  import { Flow } from '@/models'

  const props = defineProps<{
    flow: Flow,
  }>()

  const emit = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const { FlowMenu } = useComponent()
  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Flows', to: routes.flows() },
    { text: props.flow.name },
  ])

  const deleteFlow = (id: string): void => {
    emit('delete', id)
  }
</script>