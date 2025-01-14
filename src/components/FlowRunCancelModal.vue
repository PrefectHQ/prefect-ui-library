<template>
  <p-modal v-if="flowRun" v-model:showModal="showModal" title="Cancel Flow Run">
    <template #icon>
      <p-icon icon="ExclamationCircleIcon" class="flow-run-cancel-modal__icon" />
    </template>

    <p-label label="Current Flow Run State">
      <StateBadge :state="flowRun.state" />
    </p-label>

    <div class="flow-run-cancel-modal__message">
      This will put flow run {{ flowRun.name }} into a <StateBadge :state="{ name: 'Cancelling', type: 'cancelled' }" /> state.
    </div>

    <template v-if="subFlowRuns.length > 0">
      <p-checkbox v-model="shouldCancelSubFlowRuns" label="Cancel all sub flow runs" />
    </template>

    <template #actions>
      <p-button variant="destructive" :loading @click="cancel">
        Confirm
      </p-button>
    </template>
  </p-modal>
</template>


<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { useFlowRuns, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowRun, StateUpdateDetails, stuckStateTypes } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

  const showModal = defineModel<boolean>('showModal', { required: true })

  const { flowRun } = defineProps<{
    flowRun: FlowRun,
  }>()

  const emit = defineEmits(['update'])

  const api = useWorkspaceApi()
  const loading = ref(false)
  const shouldCancelSubFlowRuns = ref(false)

  const { flowRuns: subFlowRuns, subscription: subFlowRunsSubscription } = useFlowRuns(() => ({
    flowRuns: {
      parentFlowRunId: [flowRun.id],
      state: {
        type: stuckStateTypes,
      },
    },
  }))

  const state: StateUpdateDetails = {
    type: 'cancelling',
    name: 'Cancelling',
  }

  const cancel = async (): Promise<void> => {
    loading.value = true

    try {
      await api.flowRuns.setFlowRunState(flowRun.id, { state })

      if (shouldCancelSubFlowRuns.value) {
        await cancelSubFlowRuns()
      }

      emit('update')
      showModal.value = false
      showToast(localization.success.cancelFlowRun, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.cancelFlowRun)
      showToast(message, 'error')
    } finally {
      loading.value = false
    }
  }

  async function cancelSubFlowRuns(): Promise<void> {
    await subFlowRunsSubscription.refresh()

    const flowRuns = subFlowRuns.value
    const concurrentRequests = 5
    const promises = new Set<Promise<void>>()
    const executing = new Set<Promise<void>>()

    for (const flowRun of flowRuns) {
      const promise = cancelSubFlowRun(flowRun)

      promises.add(promise)
      executing.add(promise)

      promise.finally(() => {
        executing.delete(promise)
      })

      if (executing.size >= concurrentRequests) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.race(executing)
      }
    }

    const values = await Promise.allSettled(promises)
    const errors = values.filter(value => value.status === 'rejected').map(value => value.reason)

    if (errors.length > 0) {
      if (errors.length === 1) {
        const message = getApiErrorMessage(errors[0], localization.error.cancelFlowRun)
        showToast(message, 'error')
      } else {
        showToast(localization.error.cancelFlowRuns(errors.length), 'error')
      }
    }
  }

  async function cancelSubFlowRun(flowRun: FlowRun, retries = 0): Promise<void> {
    try {
      await api.flowRuns.setFlowRunState(flowRun.id, { state })
    } catch (error) {
      if (retries < 2) {
        return cancelSubFlowRun(flowRun, retries + 1)
      }

      throw error
    }
  }
</script>

<style>
.flow-run-cancel-modal__message { @apply
  inline-flex
  flex-wrap
  gap-1
  items-center
}

.flow-run-cancel-modal__icon { @apply
  stroke-sentiment-negative
}
</style>
