<template>
  <p-button v-if="canResume" icon-append="PlayIcon" v-bind="attrs" @click="open">
    Resume
  </p-button>

  <FlowRunResumeModal v-model:showModal="showModal" :flow-run-id="flowRun.id" />
</template>

  <script lang="ts" setup>
  import { computed, useAttrs } from 'vue'
  import FlowRunResumeModal from '@/components/FlowRunResumeModal.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun, isPausedStateType } from '@/models'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const attrs = useAttrs()
  const can = useCan()
  const { showModal, open } = useShowModal()

  const canResume = computed(() => {
    if (!can.update.flow_run || !props.flowRun.stateType) {
      return false
    }

    return isPausedStateType(props.flowRun.stateType)
  })
  </script>