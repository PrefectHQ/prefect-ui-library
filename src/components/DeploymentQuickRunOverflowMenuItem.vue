<template>
  <p-overflow-menu-item @click="run">
    <slot>
      Quick run
    </slot>
  </p-overflow-menu-item>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { Deployment, DeploymentFlowRunCreate } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
    openModal: () => void,
  }>()

  const api = useWorkspaceApi()
  const router = useRouter()
  const routes = useWorkspaceRoutes()

  const emit = defineEmits<{
    (event: 'run', id: string, value: DeploymentFlowRunCreate): void,
  }>()

  const run = async (): Promise<void> => {
    if (props.deployment.parameterOpenApiSchema.required) {
      props.openModal()
    } else {
      const resolvedValues: DeploymentFlowRunCreate = {
        state: {
          type: 'scheduled',
          message: 'Run from the Prefect UI',
        },
      }
      emit('run', props.deployment.id, resolvedValues)
    }
  }
</script>