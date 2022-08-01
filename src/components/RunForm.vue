<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" title="Run">
    <p-button-group v-model="nowOrLater" :options="nowOrLaterOptions" size="sm" />

    <template #actions>
      <p-button type="submit" :disabled="disabled" @click="submit">
        Run
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import  { PButton, showToast, ButtonGroupOption } from '@prefecthq/prefect-design'
  import { ref, h, computed } from 'vue'
  import { RouteLocationRaw, useRouter } from 'vue-router'
  import RunButtonToastMessage from './RunButtonToastMessage.vue'
  import { useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { flowRunRouteKey } from '@/router/routes'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'

  defineProps<{
    deployment: Deployment,
  }>()
  const { showModal, open, close } = useShowModal()
  const can = inject(canKey)
  const deploymentsApi = inject(deploymentsApiKey)
  const loading = ref(false)
  const nowOrLater = ref('now')
  const nowOrLaterOptions: ButtonGroupOption[] = [{ label: 'Now', value: 'now' }, { label: 'Later...', value: 'later' }]


  const flowRun = ref()

  const disabled = computed(() => {
    return can.create.flow_run
  })

  const router = useRouter()
  const flowRunRoute = inject(flowRunRouteKey)

  const submit = async (deployment: Deployment): Promise<void> => {
    loading.value = true

    try {
      flowRun.value = await deploymentsApi.createDeploymentFlowRun(deployment.id, {
        parameters: {},
        tags: [],
        state: {
          type: 'scheduled',
          message: 'Run through UI',
        },
      },
      )
      const runRoute: RouteLocationRaw = flowRunRoute(flowRun.value.id)
      const toastMessage = h(RunButtonToastMessage, { flowRun: flowRun.value, flowRunRoute: runRoute, routerProp:router })
      showToast(toastMessage, 'success')
    } catch (error) {
      showToast(localization.error.scheduleFlowRun, 'error')
      console.warn(error)
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

