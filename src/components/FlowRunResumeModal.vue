<template>
  <p-modal v-if="flowRun" v-model:showModal="internalValue" title="Resume Flow Run">
    <div v-if="serverValidationError">
      <p-message error>
        {{ serverValidationError }}
      </p-message>
    </div>

    <p-markdown-renderer v-if="inputDescription" :text="inputDescription" />

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
  import { OrchestrationResult } from '@/models/api/OrchestrationResult'
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

  let serverValidationError: string
  let inputDescription: string | null
  let inputSchema: Schema

  if (flowRun.value?.state?.stateDetails?.runInputKeyset) {
    try {
      inputDescription = await api.flowRuns.getFlowRunInputDescription(props.flowRunId, flowRun.value.state.stateDetails.runInputKeyset)
    } catch (error) {
      console.log('No description found')
    }
    inputSchema = await api.flowRuns.getFlowRunInputSchema(props.flowRunId, flowRun.value.state.stateDetails.runInputKeyset)
  }

  const resume = async (): Promise<void> => {
    const valid = await validate()

    if (!valid) {
      return
    }

    let response: OrchestrationResult | null

    try {
      response = await api.flowRuns.resumeFlowRun(props.flowRunId, parameters.value)
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.resumeFlowRun)
      showToast(message, 'error')
      return
    }

    if (response.status == 'ACCEPT') {
      flowRunSubscription.refresh()
      internalValue.value = false
      showToast(localization.success.resumeFlowRun, 'success')

      if (serverValidationError) {
        serverValidationError = ''
      }
    } else {
      showToast(localization.error.resumeFlowRun, 'error')
      console.log('Orchestration failed: ', response.details.reason)
      serverValidationError = response.details.reason
    }
  }
</script>

<style>
.flow-run-resume-modal__state-badge { @apply
    align-middle
}
</style>
