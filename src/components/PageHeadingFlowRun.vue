<template>
  <page-heading class="page-heading-flow-run" :crumbs="crumbs">
    <template #actions>
      <p-button :loading="restartingRun" @click="restartFromFailed">
        Retry
      </p-button>
      <p-icon-button-menu>
        <template #default>
          <copy-overflow-menu-item label="Copy ID" :item="flowRun.id" />
          <p-overflow-menu-item label="Delete" @click="open" />
          <p-overflow-menu-item v-if="can.update.flow_run" label="Mark state" @click="openSetStateModal" />
        </template>
      </p-icon-button-menu>
      <p-modal v-model:showModal="showSetStateModal">
        <StateSelect v-model:selected="setStateType" />
        <p-text-input v-model="setStateMessage" label="State message" />
        <p-button @click="markState">
          save
        </p-button>
      </p-modal>

      <ConfirmDeleteModal
        v-model:showModal="showModal"
        label="Flow Run"
        :name="flowRun.name!"
        @delete="deleteFlowRun(flowRun.id)"
      />
    </template>
    <slot>
      <div class="page-heading-flow-run__header-meta">
        <StateBadge :state="flowRun.state" />
        <DurationIconText :duration="flowRun.duration" />
        <FlowIconText :flow-id="flowRun.flowId" />
        <FlowRunStartTime :flow-run="flowRun" />
      </div>
    </slot>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu, showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { StateBadge, PageHeading, DurationIconText, FlowIconText, CopyOverflowMenuItem, ConfirmDeleteModal, FlowRunStartTime, StateSelect } from '@/components'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { localization } from '@/localization'
  import { FlowRun, StateType } from '@/models'
  import { flowRunsRouteKey } from '@/router'
  import { flowRunsApiKey } from '@/services'
  import { deleteItem, inject, workspaceApiKey } from '@/utilities'
  const api = inject(workspaceApiKey)


  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const flowRunsApi = inject(flowRunsApiKey)
  const can = useCan()
  const setStateType= ref<StateType>('completed')
  const setStateMessage = ref('')

  const { showModal, open } = useShowModal()
  const { showModal: showSetStateModal, open: openSetStateModal } = useShowModal()

  const flowRunsRoute = inject(flowRunsRouteKey)
  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [
    { text: 'Flow Runs', to: flowRunsRoute() },
    { text: props.flowRun.name ?? '' },
  ])

  const emit = defineEmits(['delete'])

  const deleteFlowRun = async (id: string): Promise<void> => {
    await deleteItem(id, flowRunsApi.deleteFlowRun, 'Flow run')
    emit('delete', id)
  }

  const markState = async (): Promise<void>=> {
    const convertedStateType = setStateType.value.toUpperCase()
    await api.flowRuns.setFlowRunState(props.flowRun.id, { state: { type: convertedStateType, message: setStateMessage.value }, force: true })
  }

  const taskRunFilter = {
    flow_runs: {
      id: {
        any_: [props.flowRun.id],
      },
    },
    task_runs:{
      state: {
        type: {
          any_: ['FAILED'],
        },
      },
    },
  }
  const restartingRun = ref(false)
  const failedTaskRuns = await api.taskRuns.getTaskRuns(taskRunFilter)
  const restartFromFailed = async (): Promise<void>=> {
    restartingRun.value = true
    try {
      failedTaskRuns.map(async (run) => await api.taskRuns.setTaskRunState(run.id, { state: { type: 'PENDING' }, force: true }))
      await api.flowRuns.setFlowRunState(props.flowRun.id, { state: { type: 'SCHEDULED', message: 'Restarted from the UI' }, force: true })
      showToast(localization.success.restartRun, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.restartRun, 'error')
    } finally {
      restartingRun.value =false
    }

  }
</script>

<style>
.page-heading-flow-run__header-meta {
  @apply
  flex
  gap-2
  items-center
  xl:hidden
}
</style>
