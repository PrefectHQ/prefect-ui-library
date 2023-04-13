<template>
  <StateListItem class="deployment-list-item" :tags="tags" disabled>
    <template #name>
      <p-link :to="routes.deployment(deployment.id)">
        <p-heading :heading="5">
          {{ deployment.name }}
        </p-heading>
      </p-link>
    </template>
  </StateListItem>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { StateListItem } from '@/components'
  import { useWorkspaceRoutes } from '@/compositions'
  import { Deployment } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const routes = useWorkspaceRoutes()
  const tags = computed(() => props.deployment.tags ?? [])
</script>