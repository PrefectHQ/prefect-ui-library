<template>
  <p-button v-if="canResume" icon-append="PlayIcon" v-bind="attrs" @click="open">
    Resume
  </p-button>

  <FlowRunResumeModal v-model:showModal="showModal" :flow-run @update="emit('update')" />
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

  const { flowRun } = defineProps<{
    flowRun: FlowRun,
  }>()

  const emit = defineEmits(['update'])

  const attrs = useAttrs()
  const can = useCan()
  const { showModal, open } = useShowModal()

  const canResume = computed(() => {
    if (!can.update.flow_run || !flowRun.stateType) {
      return false
    }

    return isPausedStateType(flowRun.stateType)
  })
  </script>
