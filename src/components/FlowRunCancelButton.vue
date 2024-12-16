<template>
  <p-tooltip v-if="disableCancel" :text="localization.info.disableFlowRunCancel" v-bind="$attrs">
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
    :flow-run="flowRun"
    @update="emit('update')"
  />
</template>

  <script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunCancelModal from '@/components/FlowRunCancelModal.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { localization } from '@/localization'
  import { FlowRun, isStuckStateType } from '@/models'

  defineOptions({
    inheritAttrs: false,
  })

  const { flowRun } = defineProps<{
    flowRun: FlowRun,
  }>()

  const emit = defineEmits(['update'])

  const can = useCan()
  const { showModal, open } = useShowModal()

  const canCancel = computed(() => {
    if (!can.update.flow_run || !flowRun.stateType) {
      return false
    }
    return isStuckStateType(flowRun.stateType)
  })

  const disableCancel = computed(() => {
    if (!flowRun.deploymentId && canCancel.value) {
      return true
    }
    return false
  })
</script>
