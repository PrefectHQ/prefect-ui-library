<template>
  <p-modal v-if="flowRun" v-model:showModal="internalValue" title="Cancel Flow Run">
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
      <p-button danger @click="cancel">
        Confirm
      </p-button>
    </template>
  </p-modal>
</template>


<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { StateUpdateDetails } from '@/models'

  const props = defineProps<{
    showModal: boolean,
    flowRunId: string,
  }>()


  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'cancel'): void,
  }>()

  const api = useWorkspaceApi()

  const internalValue = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  const flowRunSubscription = useSubscription(api.flowRuns.getFlowRun, [props.flowRunId], { interval: 30000 })
  const flowRun = computed(() => flowRunSubscription.response)

  const cancel = async (): Promise<void> => {
    try {
      const values: StateUpdateDetails = {
        type: 'cancelled',
        name: 'Cancelling',
      }
      await api.flowRuns.setFlowRunState(props.flowRunId, { state: values })
      flowRunSubscription.refresh()
      internalValue.value = false
      emit('cancel')
      showToast(localization.success.cancelFlowRun, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.cancelFlowRun, 'error')
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
  stroke-danger
}
</style>
