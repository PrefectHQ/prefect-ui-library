<template>
  <slot v-if="deployment" :deployment="deployment" />
</template>

<script lang="ts" setup>
  import { useDeployment } from '@/compositions/useDeployment'

  const props = defineProps<{
    deploymentId: string | null | undefined,
  }>()

  const { deployment } = useDeployment(() => props.deploymentId)
</script>