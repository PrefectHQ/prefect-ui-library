<template>
  <p-tag v-if="deployment.status" :class="classes.root" class="deployment-status-badge">
    <DeploymentStatusIcon :status="deployment.status" />
    {{ getDeploymentStatusLabel(deployment.status) }}
  </p-tag>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import DeploymentStatusIcon from '@/components/DeploymentStatusIcon.vue'
  import { Deployment } from '@/models'
  import { getDeploymentStatusLabel } from '@/models/DeploymentStatus'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const classes = computed(() => ({
    root: {
      'deployment-status-badge--ready': props.deployment.status === 'ready',
      'deployment-status-badge--not-ready': props.deployment.status === 'not_ready',
      'deployment-status-badge--disabled': props.deployment.status === 'disabled',
    },
  }))
</script>

<style>
.deployment-status-badge { @apply
  border
  border-divider
  font-mono
}

.deployment-status-badge--ready { @apply
  bg-sentiment-positive
  bg-opacity-10
}

.deployment-status-badge--not-ready { @apply
  bg-sentiment-warning
  bg-opacity-10
}

.deployment-status-badge--disabled { @apply
  bg-sentiment-neutral
  bg-opacity-10
}
</style>