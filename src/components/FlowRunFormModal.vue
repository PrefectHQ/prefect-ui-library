<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" class="flow-run-form-modal">
    <template #title>
      <div>
        New run of <span class="flow-run-form-modal__title">{{ deployment.name }}</span>
      </div>
    </template>

    <FlowRunForm v-model="flowRunForm" :deployment="deployment" @submit="submit" />

    <template #actions>
      <p-button type="submit" :disabled="disabled" @click="submit">
        Run
        <!-- {{ useParameters == 'custom' ? '(custom)' : '' }} -->
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import  { PButton, showToast } from '@prefecthq/prefect-design'
  import { ref, h, computed, watch, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import CreateFlowRunToast from './CreateFlowRunToast.vue'
  import FlowRunForm from './FlowRunForm.vue'
  import { useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'

  import { flowRunRouteKey } from '@/router'
  import { mocker } from '@/services'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'

  const generateRandomName = (): string => {
    return mocker.create('runName')
  }

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const can = inject(canKey)
  const deploymentsApi = inject(deploymentsApiKey)

  const flowRun = ref()
  const loading = ref(false)

  const disabled = computed(() => {
    return !can.create.flow_run
  })

  const flowRunForm = reactive({})
  const { open, close, showModal } = useShowModal()

  const router = useRouter()
  const flowRunRoute = inject(flowRunRouteKey)

  const submit = async (): Promise<void> => {
    console.log(flowRunForm)
    // loading.value = true

    // try {
    //   flowRun.value = await deploymentsApi.createDeploymentFlowRun(props.deployment.id, flowRunFormValue.value)
    //   const toastMessage = h(CreateFlowRunToast, { flowRun: flowRun.value, immediate: nowOrLater.value == 'now', startTime: utcStartTime.value, router, flowRunRoute })
    //   close()
    //   showToast(toastMessage, 'success')
    // } catch (error) {
    //   showToast(localization.error.scheduleFlowRun, 'error')
    //   console.warn(error)
    // } finally {
    //   loading.value = false
    // }
  }

  // watch(showModal, (val, oldVal) => {
  //   if (val && !oldVal) {
  //     resetForm({ values: getInitialFormValues() })
  //   }
  // })
</script>

<style>
.flow-run-form-modal__random-name-button { @apply
  rounded-none
  rounded-tr
  rounded-br
}

.flow-run-form-modal__title { @apply
  font-semibold
  m-0
  p-0
}

.flow-run-form-modal__section-header { @apply
  text-lg
  font-semibold
}

.flow-run-form-modal__row { @apply
  grid
  gap-2
  grid-cols-4;
}
</style>

