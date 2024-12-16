<template>
  <p-button
    v-if="canSuspend"
    icon-append="PauseIcon"
    @click="open"
  >
    Suspend
    <FlowRunSuspendModal
      v-model:showModal="showModal"
      :flow-run="flowRun"
      @update="emit('update')"
    />
  </p-button>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunSuspendModal from '@/components/FlowRunSuspendModal.vue'
  import { useCan, useShowModal } from '@/compositions'
  import { FlowRun, isRunningStateType } from '@/models'

  const { flowRun } = defineProps<{
    flowRun: FlowRun,
  }>()

  const emit = defineEmits(['update'])

  const can = useCan()
  const { showModal, open } = useShowModal()

  const canSuspend = computed(() => {
    if (!can.update.flow_run || !flowRun.stateType || !flowRun.deploymentId) {
      return false
    }

    return isRunningStateType(flowRun.stateType)
  })
</script>