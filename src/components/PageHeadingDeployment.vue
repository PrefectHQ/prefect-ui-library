<template>
  <page-heading class="page-heading-deployment" :crumbs="crumbs">
    <template #actions>
      <DeploymentToggle :deployment="deployment" @update="emit('update')" />

      <RunMenu v-if="can.run.deployment && media.sm" :deployment="deployment" />

      <DeploymentMenu :deployment="deployment" @delete="handleDelete">
        <template v-if="can.run.deployment && !media.sm" #additional-items>
          <DeploymentQuickRunOverflowMenuItem :deployment-id="deployment.id" />
          <DeploymentCustomRunOverflowMenuItem :deployment-id="deployment.id" />
        </template>
      </DeploymentMenu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { DeploymentCustomRunOverflowMenuItem, DeploymentQuickRunOverflowMenuItem, DeploymentMenu, DeploymentToggle, PageHeading, RunMenu } from '@/components'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { Deployment } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const can = useCan()
  const router = useRouter()
  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Deployments', to: routes.deployments() },
    { text: props.deployment.name },
  ])

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const handleDelete = (): void => {
    router.back()
  }
</script>