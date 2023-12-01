<template>
  <p-button
    v-if="canSuspend"
    icon-append="PauseIcon"
    @click="open"
  >
    Suspend
    <FlowRunSuspendModal
      v-model:showModal="showModal"
      :flow-run-id="flowRun.id"
      @change="showModal"
    />
  </p-button>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunSuspendModal from '@/components/FlowRunSuspendModal.vue'
  import { useCan, useShowModal } from '@/compositions'
  import { FlowRun, isRunningStateType } from '@/models'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const can = useCan()
  const { showModal, open } = useShowModal()

  const canSuspend = computed(() => {
    if (!can.update.flow_run || !props.flowRun.stateType || !props.flowRun.deploymentId) {
      return false
    }

    return isRunningStateType(props.flowRun.stateType)
  })
</script>