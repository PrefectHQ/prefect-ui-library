<template>
  <p-button
    v-if="canPause"
    inset
    @click="open"
  >
    Pause
    <p-icon icon="PauseIcon" />
    <FlowRunPauseModal
      v-model:showModal="showModal"
      :flow-run-id="flowRun.id"
      @change="showModal"
    />
  </p-button>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunPauseModal from '@/components/FlowRunPauseModal.vue'
  import { useCan, useShowModal } from '@/compositions'
  import { FlowRun, isRunningStateType } from '@/models'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const can = useCan()
  const { showModal, open } = useShowModal()

  const canPause = computed(()=> {
    if (!can.update.flow_run || !props.flowRun.stateType || !props.flowRun.deploymentId) {
      return false
    }

    return isRunningStateType(props.flowRun.stateType)
  })
</script>