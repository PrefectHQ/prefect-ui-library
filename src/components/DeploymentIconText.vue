<template>
  <template v-if="can.read.deployment">
    <p-link :to="deploymentRoute(deploymentId)" class="deployment-icon-text">
      <p-icon-text icon="LocationMarkerIcon">
        <span>{{ deploymentName }}</span>
      </p-icon-text>
    </p-link>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useCan } from '@/compositions/useCan'
  import { useDeployment } from '@/compositions/useDeployment'
  import { deploymentRouteKey } from '@/router/routes'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    deploymentId: string,
  }>()

  const can = useCan()
  const deploymentRoute = inject(deploymentRouteKey)
  const deploymentId = computed(() => props.deploymentId)
  const deployment = useDeployment(deploymentId)
  const deploymentName = computed(() => deployment.value?.name)
</script>