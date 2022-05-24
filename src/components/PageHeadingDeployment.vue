<template>
  <page-heading class="page-heading-deployment" :crumbs="crumbs">
    <template #actions>
      <DeploymentToggle :deployment="deployment" />

      <p-button inset>
        Run
        <p-icon class="page-heading-deployment__run-icon" icon="PlayIcon" solid />
      </p-button>

      <p-icon-button-menu>
        <template #default>
          <p-overflow-menu-item label="Copy ID" />
          <p-overflow-menu-item label="Delete" />
        </template>
      </p-icon-button-menu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu, PIcon, PButton } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import DeploymentToggle from '@/components/DeploymentToggle.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Deployment } from '@/models'
  import { flowsRouteKey } from '@/router'
  import { flowsApiKey } from '@/services'
  import { inject } from '@/utilities'

  const flowsRoute = inject(flowsRouteKey)
  const flowsApi = inject(flowsApiKey)

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const flowSubscription = useSubscription(flowsApi.getFlow, [props.deployment.flowId])
  const flowName = computed(() => flowSubscription.response?.name ?? '')

  const crumbs = computed(() => [{ text: flowName.value, to: flowsRoute() }, { text: props.deployment.name }])
</script>

<style>
.page-heading-deployment__run-icon { @apply
  w-5
  h-5
}
</style>