<template>
  <p-modal v-if="flowRun" v-model:showModal="showModal" title="Suspend Flow Run">
    <p-label label="Current Flow Run State">
      <StateBadge :state="flowRun.state" />
    </p-label>
    <p-label label="Timeout" :message="timeoutErrorMessage" :state="timeoutState">
      <p-number-input v-model="timeout" min="5" :state="timeoutState" />
    </p-label>
    <div>
      Do you want to suspend {{ flowRun.name }}? This will put flow run into a <StateBadge :state="{ name: 'Suspended', type: 'paused' }" class="flow-run-suspend-modal__state-badge" /> state for {{ secondsToApproximateString(timeout) }}.
    </div>

    <template #actions>
      <p-button variant="default" :loading="isSubmitting" @click="submit">
        Submit
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { addSeconds } from 'date-fns'
  import { useField } from 'vee-validate'
  import { ref } from 'vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { useForm, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowRun, StateUpdateDetails } from '@/models'
  import { fieldRules, isGreaterThan, isRequired } from '@/utilities'
  import { getApiErrorMessage } from '@/utilities/errors'
  import { secondsToApproximateString } from '@/utilities/seconds'

  const showModal = defineModel<boolean>('showModal', { required: true })

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const emit = defineEmits(['update'])

  const defaultTimeout = ref<number>(300)

  const { handleSubmit, isSubmitting } = useForm()

  const { value: timeout, meta: timeoutState, errorMessage: timeoutErrorMessage } = useField<number>('timeout', fieldRules('Limit', isRequired, isGreaterThan(4)), { initialValue: defaultTimeout })

  const api = useWorkspaceApi()


  const submit = handleSubmit(async (formValues): Promise<void> => {
    try {
      const { timeout } = formValues
      const values: StateUpdateDetails = {
        type: 'paused',
        name: 'Suspended',
        stateDetails: {
          pauseTimeout: addSeconds(new Date(), timeout),
          pauseReschedule: true,
        },
      }
      await api.flowRuns.setFlowRunState(props.flowRun.id, { state: values })
      emit('update')
      showModal.value = false
      showToast(localization.success.suspendFlowRun, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.suspendFlowRun)
      showToast(message, 'error')
    }
  })
</script>

<style>
.flow-run-suspend-modal__state-badge { @apply
    align-middle
}
</style>
