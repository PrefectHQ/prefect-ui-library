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
  import { RouterLink } from 'vue-router'
  import { deploymentRouteKey } from '@/router/routes'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    deploymentId: string,
  }>()

  const deploymentRoute = inject(deploymentRouteKey)

  const deploymentsApi = inject(deploymentsApiKey)
  const deploymentsSubscription = useSubscription(deploymentsApi.getDeployment, [props.deploymentId])
  const deploymentName = computed(() => deploymentsSubscription.response?.name)
</script>