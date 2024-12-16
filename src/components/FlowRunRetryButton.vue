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
      :flow-run
      @update="emit('update')"
    />
  </p-button>
</template>

  <script lang="ts" setup>
  import { computed, ref } from 'vue'
  import FlowRunRetryModal from '@/components/FlowRunRetryModal.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun, isTerminalStateType } from '@/models'

  const { flowRun } = defineProps<{
    flowRun: FlowRun,
  }>()

  const emit = defineEmits(['update'])

  const can = useCan()
  const { showModal, open } = useShowModal()

  const canRetry = computed(() => {
    if (!can.update.flow_run || !flowRun.stateType || !flowRun.deploymentId) {
      return false
    }

    return isTerminalStateType(flowRun.stateType)
  })

  const retryingRun = ref(false)
  </script>
