<template>
  <p-modal v-if="flowRun" v-model:showModal="internalValue" title="Pause Flow Run">
    <p-label label="Current Flow Run State">
      <StateBadge :state="flowRun.state" />
    </p-label>
    <div>
      Do you want to pause {{ flowRun.name }}? This will put flow run into a <StateBadge :state="{ name: 'Paused', type: 'paused' }" class="flow-run-pause-modal__state-badge" /> state.
    </div>

    <template #actions>
      <p-button @click="pause">
        Submit
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

  const flowRunSubscription = useSubscription(api.flowRuns.getFlowRun, [props.flowRunId])
  const flowRun = computed(() => flowRunSubscription.response)

  const pause = async (): Promise<void> => {
    try {
      const values: StateUpdateDetails = {
        type: 'paused',
        name: 'Paused',
      }
      await api.flowRuns.setFlowRunState(props.flowRunId, { state: values })
      flowRunSubscription.refresh()
      internalValue.value = false
      showToast(localization.success.pauseFlowRun, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.pauseFlowRun, 'error')
    }
  }
</script>

<style>
.flow-run-pause-modal__state-badge { @apply
    align-middle
}
</style>