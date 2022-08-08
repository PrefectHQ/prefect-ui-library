<template>
  <page-heading class="page-heading-deployment" :crumbs="crumbs">
    <template #actions>
      <DeploymentToggle :deployment="deployment" @update="emit('update')" />
      <RunMenu v-if="can.create.flow_run" :deployment="deployment" />

      <DeploymentMenu :deployment="deployment" @delete="handleDelete" />
    </template>

    <slot>
      <div class="page-heading-deployment__header-meta">
        <FlowIconText :flow-id="deployment.flowId" />
      </div>
    </slot>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import DeploymentMenu from '@/components/DeploymentMenu.vue'
  import DeploymentToggle from '@/components/DeploymentToggle.vue'
  import FlowIconText from '@/components/FlowIconText.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import RunMenu from '@/components/RunMenu.vue'
  import { Deployment } from '@/models'
  import { deploymentsRouteKey } from '@/router'
  import { canKey } from '@/types/permissions'
  import { inject } from '@/utilities'

  const deploymentsRoute = inject(deploymentsRouteKey)
  const router = useRouter()

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const crumbs = computed(() => [
    { text: 'Deployments', to: deploymentsRoute() },
    { text: props.deployment.name },
  ])

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const handleDelete = (): void => {
    router.back()
  }

  const can = inject(canKey)
</script>

<style>
.page-heading-deployment__run-icon { @apply
  w-5
  h-5
}

.page-heading-deployment__header-meta { @apply
  xl:hidden
}
</style>