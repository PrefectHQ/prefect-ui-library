<template>
  <template v-if="can.read.deployment">
    <router-link :to="deploymentRoute(deploymentId)" class="deployment-icon-text">
      <p-icon-text icon="LocationMarkerIcon">
        <span>{{ deploymentName }}</span>
      </p-icon-text>
    </router-link>
  </template>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useCan } from '@/compositions/useCan'
  import { deploymentRouteKey } from '@/router/routes'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    deploymentId: string,
  }>()

  const can = useCan()
  const deploymentRoute = inject(deploymentRouteKey)

  const deploymentsApi = inject(deploymentsApiKey)
  const deploymentSubscriptionArgs = computed<[string] | null>(() => {
    if (!can.read.deployment) {
      return null
    }

    return [props.deploymentId]
  })
  const deploymentsSubscription = useSubscriptionWithDependencies(deploymentsApi.getDeployment, deploymentSubscriptionArgs)
  const deploymentName = computed(() => deploymentsSubscription.response?.name)
</script>