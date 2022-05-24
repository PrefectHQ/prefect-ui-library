<template>
  <page-heading :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <template #default="{ close }">
          <p-overflow-menu-item label="Copy ID" icon="DocumentDuplicateIcon" @click="close" />
        </template>
      </p-icon-button-menu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Deployment, Flow } from '@/models'
  import { flowsRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const flowsRoute = inject(flowsRouteKey)

  const props = defineProps<{
    deployment: Deployment,
    flow: Flow,
  }>()

  const crumbs = computed(() => [{ text: props.flow.name, to: flowsRoute }, { text: props.deployment.name }])
</script>