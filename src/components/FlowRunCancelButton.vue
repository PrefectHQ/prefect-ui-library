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
      @change="showModal"
    />
  </p-button>
</template>

  <script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import FlowRunCancelModal from '@/components/FlowRunCancelModal.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun, isStuckStateType } from '@/models'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const can = useCan()
  const { showModal, open } = useShowModal()

  const api = useWorkspaceApi()

  const flowRunFilter = computed<Parameters<typeof api.flowRuns.getFlowRuns> | null>(() => {
    if (props.flowRun.parentTaskRunId) {
      return [
        {
          task_runs: {
            id: {
              any_: [props.flowRun.parentTaskRunId],
            },
          },
        },
      ]
    }
    return null
  })
  const parentFlowRunListSubscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRuns, flowRunFilter)
  const parentFlowRunList = computed(() => parentFlowRunListSubscription.response ?? [])
  const parentFlowRunId = computed(() => {
    if (!parentFlowRunList.value.length) {
      return
    }
    const [value] = parentFlowRunList.value
    return value.id
  })

  const canCancel = computed(()=> {
    if (!can.update.flow_run || !props.flowRun.stateType || parentFlowRunId.value) {
      return false
    }
    return isStuckStateType(props.flowRun.stateType)
  })
  </script>
