<template>
  <p-button
    v-if="canRerun"
    icon-append="ArrowPathIcon"
    :loading="rerunningRun"
    @click="open"
  >
    Rerun
    <FlowRunRerunModal
      v-model:showModal="showModal"
      v-model:rerunningRun="rerunningRun"
      :flow-run="flowRun"
    />
  </p-button>
</template>

  <script lang="ts" setup>
  import { computed, ref } from 'vue'
  import FlowRunRerunModal from '@/components/FlowRunRerunModal.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun, isTerminalStateType } from '@/models'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const can = useCan()
  const { showModal, open } = useShowModal()

  const canRerun = computed(() => {
    if (!can.update.flow_run || !props.flowRun.stateType || !props.flowRun.deploymentId) {
      return false
    }

    return isTerminalStateType(props.flowRun.stateType)
  })

  const rerunningRun = ref(false)
  </script>
