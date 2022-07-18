<template>
  <p-button v-if="can.create.flow_run" class="run-button" inset :loading="loading" @click="run(deployment)">
    Run
    <p-icon class="run-button__run-icon" icon="PlayIcon" solid />
  </p-button>
  <RunButtonToastMessage v-if="flowyRun" v-show="false" ref="fr" :name="name" />
</template>

<script lang="ts" setup>
  import  { PButton, showToast } from '@prefecthq/prefect-design'
  import { ref, h } from 'vue'
  import RunButtonToastMessage from './RunButtonToastMessage.vue'
  import { Deployment } from '@/models'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  // import { useStore } from '@/stores/toast'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'

  defineProps<{
    deployment: Deployment,
  }>()

  const can = inject(canKey)
  const deploymentsApi = inject(deploymentsApiKey)
  const loading = ref(false)
  const fr = ref(null)
  const name = ref()
  const flowyRun = ref()

  // const store = useStore()


  const run = async (deployment: Deployment): Promise<void> => {
    loading.value = true
    try {
      flowyRun.value = await deploymentsApi.createDeploymentFlowRun(deployment.id, {
        state: {
          type: 'scheduled',
          message: 'Run through UI',
        },
      },
      )
      name.value=flowyRun.value.name
      console.log('flowRun', flowyRun, fr)
      const p = h(RunButtonToastMessage, { name: name.value })
      showToast(p)
    } catch (errorMessage) {
      console.log(errorMessage)
      showToast('Failed to schedule flow run', 'error')
    } finally {
      loading.value = false
    }
  }
</script>

<style>
.run-button__run-icon { @apply
  w-5
  h-5
}
</style>

