<template>
  <page-heading class="page-heading-deployment" :crumbs="crumbs">
    <template #actions>
      <DeploymentToggle :deployment="deployment" @update="emit('update')" />

      <template v-if="can.run.deployment">
        <RunMenu :deployment="deployment" class="page-heading-deployment__run-menu" />
      </template>

      <DeploymentMenu :deployment="deployment" @delete="handleDelete">
        <template v-if="can.run.deployment" #additional-items>
          <div class="page-heading-deployment__run-menu-item">
            <router-link :to="flowRunCreateRoute(deployment.id)">
              <p-overflow-menu-item>
                Run
              </p-overflow-menu-item>
            </router-link>
          </div>
        </template>
      </DeploymentMenu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import DeploymentMenu from '@/components/DeploymentMenu.vue'
  import DeploymentToggle from '@/components/DeploymentToggle.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import RunMenu from '@/components/RunMenu.vue'
  import { useCan } from '@/compositions/useCan'
  import { Deployment } from '@/models'
  import { deploymentsRouteKey, flowRunCreateRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const can = useCan()
  const router = useRouter()
  const deploymentsRoute = inject(deploymentsRouteKey)
  const flowRunCreateRoute = inject(flowRunCreateRouteKey)

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
</script>

<style>
.page-heading-deployment__run-menu { @apply
  hidden
  sm:block
}

.page-heading-deployment__run-menu-item { @apply
  block
  sm:hidden
}
</style>