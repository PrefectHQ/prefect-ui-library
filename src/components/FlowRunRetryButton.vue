<template>
  <p-button
    v-if="canRetry"
    icon-append="ArrowPathIcon"
    :loading="retryingRun"
    @click="open"
  >
    Retry
    <FlowRunRetryModal
      v-model:showModal="showModal"
      v-model:retryingRun="retryingRun"
      :flow-run="flowRun"
    />
  </p-button>
</template>

  <script lang="ts" setup>
  import { computed, ref } from 'vue'
  import FlowRunRetryModal from '@/components/FlowRunRetryModal.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun, isTerminalStateType } from '@/models'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const can = useCan()
  const { showModal, open } = useShowModal()

  const canRetry = computed(() => {
    if (!can.update.flow_run || !props.flowRun.stateType || !props.flowRun.deploymentId) {
      return false
    }

    return isTerminalStateType(props.flowRun.stateType)
  })

  const retryingRun = ref(false)
  </script>
