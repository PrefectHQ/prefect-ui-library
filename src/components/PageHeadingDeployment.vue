<template>
  <page-heading class="page-heading-deployment" :crumbs="crumbs">
    <template #actions>
      <DeploymentToggle :deployment="deployment" @update="emit('update')" />

      <RunButton v-if="can.create.flow_run" :deployment="deployment" />

      <DeploymentMenu :deployment="deployment" @delete="handleDelete" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import RunButton from './RunButton.vue'
  import DeploymentMenu from '@/components/DeploymentMenu.vue'
  import DeploymentToggle from '@/components/DeploymentToggle.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Deployment } from '@/models'
  import { flowRouteKey } from '@/router'
  import { flowsApiKey } from '@/services'
  import { canKey } from '@/types/permissions'
  import { inject } from '@/utilities'

  const flowRoute = inject(flowRouteKey)
  const flowsApi = inject(flowsApiKey)
  const router = useRouter()

  const props = defineProps<{
    deployment: Deployment,
  }>()


  const flowSubscription = useSubscription(flowsApi.getFlow, [props.deployment.flowId])
  const flowName = computed(() => flowSubscription.response?.name ?? '')

  const crumbs = computed(() => [{ text: flowName.value, to: flowRoute(props.deployment.flowId) }, { text: props.deployment.name }])

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
</style>