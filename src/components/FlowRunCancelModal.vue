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

    <template #actions>
      <p-button variant="destructive" @click="cancel">
        Confirm
      </p-button>
    </template>
  </p-modal>
</template>


<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import StateBadge from '@/components/StateBadge.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowRun, StateUpdateDetails } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

  const showModal = defineModel<boolean>('showModal', { required: true })

  const { flowRun } = defineProps<{
    flowRun: FlowRun,
  }>()

  const emit = defineEmits(['update'])

  const api = useWorkspaceApi()

  const cancel = async (): Promise<void> => {
    try {
      const values: StateUpdateDetails = {
        type: 'cancelling',
        name: 'Cancelling',
      }
      await api.flowRuns.setFlowRunState(flowRun.id, { state: values })
      emit('update')
      showModal.value = false
      showToast(localization.success.cancelFlowRun, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.cancelFlowRun)
      showToast(message, 'error')
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
