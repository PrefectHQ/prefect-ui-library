<template>
  <router-link :to="deploymentRoute(deploymentId)" class="deployment-icon-text">
    <p-icon-text icon="LocationMarkerIcon">
      <span>{{ deploymentName }}</span>
    </p-icon-text>
  </router-link>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { deploymentRouteKey } from '@/router/routes'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    deploymentId: string,
    deploymentName?: string,
  }>()

  const deploymentRoute = inject(deploymentRouteKey)

  const deploymentsApi = inject(deploymentsApiKey)
  const deploymentsSubscription = props.deploymentName ?? useSubscription(deploymentsApi.getDeployment, [props.deploymentId])
  const deploymentName = computed(() => {
    if (typeof deploymentsSubscription === 'string') {
      return props.deploymentName
    }

    return deploymentsSubscription.response?.name
  })
</script>