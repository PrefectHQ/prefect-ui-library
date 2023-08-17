<template>
  <p-tooltip v-if="disableCancel" :text="localization.info.disableFlowRunCancel">
    <p-button
      disabled
      dangerous
    >
      Cancel
    </p-button>
  </p-tooltip>
  <p-button
    v-else-if="canCancel"
    dangerous
    @click="open"
  >
    Cancel
  </p-button>
  <FlowRunCancelModal
    v-model:showModal="showModal"
    :flow-run-id="flowRun.id"
    @change="showModal"
  />
</template>

  <script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunCancelModal from '@/components/FlowRunCancelModal.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { localization } from '@/localization'
  import { FlowRun, isStuckStateType } from '@/models'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const can = useCan()
  const { showModal, open } = useShowModal()

  const canCancel = computed(() => {
    if (!can.update.flow_run || !props.flowRun.stateType) {
      return false
    }
    return isStuckStateType(props.flowRun.stateType)
  })

  const disableCancel = computed(() => {
    if (!props.flowRun.deploymentId && canCancel.value) {
      return true
    }
    return false
  })
</script>
