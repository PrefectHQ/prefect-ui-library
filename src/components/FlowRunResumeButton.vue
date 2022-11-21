<template>
  <p-button
    v-if="canResume"
    inset
    @click="open"
  >
    Resume
    <p-icon icon="PlayIcon" />
    <FlowRunResumeModal
      v-model:showModal="showModal"
      :flow-run-id="flowRun.id"
      @change="showModal"
    />
  </p-button>
</template>

  <script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunResumeModal from '@/components/FlowRunResumeModal.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun, isPausedStateName } from '@/models'
  const props = defineProps<{
    flowRun: FlowRun,
  }>()
  const can = useCan()
  const { showModal, open } = useShowModal()
  const canResume = computed(()=> {
    if (!can.update.flow_run || props.flowRun.state && !isPausedStateName(props.flowRun.state.name)) {
      return false
    }

    return true
  })
  </script>