<template>
  <p-modal v-if="flowRun" v-model:showModal="internalValue" title="Resume Flow Run">
    <p-label label="Current Flow Run State">
      <StateBadge :state="flowRun.state" />
    </p-label>

    <div v-if="inputSchema">
      <strong>Flow run requires input.</strong> Please fill out the form below to resume.
    </div>
    <div v-else>
      Do you want to resume {{ flowRun.name }}?
    </div>

    <p-form v-if="inputSchema" @submit="resume">
      <SchemaInput v-model="parameters" :schema="inputSchema" disable-input-types />
    </p-form>

    <template #actions>
      <p-button primary @click="resume">
        Submit
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useSubscription, useValidationObserver } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { SchemaInput } from '@/components'
  import StateBadge from '@/components/StateBadge.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Schema, SchemaValues } from '@/types/schemas'
  import { getApiErrorMessage } from '@/utilities/errors'


  const props = defineProps<{
    showModal: boolean,
    flowRunId: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const api = useWorkspaceApi()
  const parameters = ref<SchemaValues>({})

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
  const { validate } = useValidationObserver()

  let inputSchema: Schema

  if (flowRun.value?.state?.stateDetails?.runInputKeyset) {
    inputSchema = await api.flowRuns.getFlowRunInput(props.flowRunId, flowRun.value.state.stateDetails.runInputKeyset.schema)
  }

  const resume = async (): Promise<void> => {
    const valid = await validate()

    if (!valid) {
      return
    }

    try {
      await api.flowRuns.resumeFlowRun(props.flowRunId, parameters.value)
      flowRunSubscription.refresh()
      internalValue.value = false
      showToast(localization.success.resumeFlowRun, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.resumeFlowRun)
      showToast(message, 'error')
    }
  }
</script>

<style>
.flow-run-resume-modal__state-badge { @apply
    align-middle
}
</style>
