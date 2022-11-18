<template>
  <p-button
    v-if="canCancel"
    secondary
    danger
    @click="open"
  >
    Cancel
    <FlowRunCancelModal
      v-model:showModal="showModal"
      :flow-run-id="flowRun.id"
      label="Flow Run"
      @change="showModal"
    />
  </p-button>
</template>

  <script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunCancelModal from '@/components/FlowRunCancelModal.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun, isStuckStateType } from '@/models'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const can = useCan()
  const { showModal, open } = useShowModal()

  const canCancel = computed(()=> {
    if (!can.update.flow_run || !props.flowRun.stateType) {
      return false
    }
    return isStuckStateType(props.flowRun.stateType)
  })
  </script>
