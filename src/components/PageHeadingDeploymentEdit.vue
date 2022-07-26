<template>
  <page-heading class="page-heading-deployment-edit" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Deployment } from '@/models'
  import { flowRouteKey, deploymentRouteKey } from '@/router'
  import { flowsApiKey } from '@/services'
  import { inject } from '@/utilities'

  const flowRoute = inject(flowRouteKey)
  const flowsApi = inject(flowsApiKey)

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const deploymentRoute = inject(deploymentRouteKey)

  const flowSubscription = useSubscription(flowsApi.getFlow, [props.deployment.flowId])
  const flowName = computed(() => flowSubscription.response?.name ?? '')

  const crumbs = computed(() => [{ text: flowName.value, to: flowRoute(props.deployment.flowId) }, { text: props.deployment.name, to: deploymentRoute(props.deployment.id) }, { text: 'Edit' }])
</script>