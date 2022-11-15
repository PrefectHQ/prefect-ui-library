<template>
  <page-heading class="page-heading-deployment" :crumbs="crumbs">
    <template #actions>
      <DeploymentToggle :deployment="deployment" @update="emit('update')" />

      <template v-if="can.run.deployment">
        <RunMenu :deployment="deployment" />
      </template>

      <DeploymentMenu :deployment="deployment" @delete="handleDelete" />
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
  import { deploymentsRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const can = useCan()
  const router = useRouter()
  const deploymentsRoute = inject(deploymentsRouteKey)

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
.page-heading-deployment__run-icon { @apply
  w-5
  h-5
}
</style>