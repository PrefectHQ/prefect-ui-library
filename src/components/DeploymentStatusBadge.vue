<template>
  <template v-if="deployment.status">
    <p-tag>
      <DeploymentStatusIcon :status="deployment.status" />
      {{ titleCase(deployment.status) }}
    </p-tag>
  </template>
</template>

<script lang="ts" setup>
  import DeploymentStatusIcon from '@/components/DeploymentStatusIcon.vue'
  import { Deployment } from '@/models'
  import { titleCase } from '@/utilities'

  defineProps<{
    deployment: Deployment,
  }>()
</script>
