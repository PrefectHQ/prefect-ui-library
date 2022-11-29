<template>
  <p-modal v-if="flowRun" v-model:showModal="internalValue" title="Resume Flow Run">
    <p-label label="Current Flow Run State">
      <StateBadge :state="flowRun.state" />
    </p-label>
    <div class="flow-run-resume-modal__message">
      Do you want to resume {{ flowRun.name }}. This will put flow run into a <StateBadge :state="{ name: 'Running', type: 'running' }" class="flow-run-resume-modal__state-badge" /> state.
    </div>

    <template #actions>
      <p-button danger @click="resume">
        Submit
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import StateBadge from './StateBadge.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import {  StateUpdateDetails } from '@/models'
  const props = defineProps<{
    showModal: boolean,
    flowRunId: string,
  }>()
  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'resume'): void,
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
  const flowRunSubscription =  useSubscription(api.flowRuns.getFlowRun, [props.flowRunId], { interval: 30000 })
  const flowRun = computed(() => flowRunSubscription.response)
  const resume  = async (): Promise<void>=> {
    try {
      const values: StateUpdateDetails = {
        type: 'running',
        name: 'Running',
      }
      await api.flowRuns.setFlowRunState(props.flowRunId, { state: values })
      flowRunSubscription.refresh()
      showToast(localization.success.resumeFlowRun, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.resumeFlowRun, 'error')
    }
  }
</script>

<style>
.flow-run-resume-modal__message { @apply
  inline-flex
  flex-wrap
  gap-1
  items-center
}
</style>