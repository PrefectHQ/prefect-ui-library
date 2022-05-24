<template>
  <page-heading class="page-heading-deployment" :crumbs="crumbs">
    <template #actions>
      <DeploymentToggle :deployment="deployment" />

      <p-button inset>
        Run
        <p-icon class="page-heading-deployment__run-icon" icon="PlayIcon" solid />
      </p-button>

      <p-icon-button-menu>
        <template #default="{ close }">
          <p-overflow-menu-item label="Copy ID" icon="DocumentDuplicateIcon" @click="close" />
        </template>
      </p-icon-button-menu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu, PIcon, PButton } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import DeploymentToggle from '@/components/DeploymentToggle.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Deployment, Flow } from '@/models'
  import { flowsRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const flowsRoute = inject(flowsRouteKey)

  const props = defineProps<{
    deployment: Deployment,
    flow: Flow,
  }>()

  const crumbs = computed(() => [{ text: props.flow.name, to: flowsRoute() }, { text: props.deployment.name }])
</script>

<style>
.page-heading-deployment__run-icon { @apply
  w-5
  h-5
}
</style>