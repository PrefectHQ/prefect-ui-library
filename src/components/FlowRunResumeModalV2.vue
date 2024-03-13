<template>
  <p-modal v-if="flowRun" v-model:showModal="showModal" title="Resume Flow Run">
    <p-message v-if="serverValidationError" error>
      {{ serverValidationError }}
    </p-message>

    <template v-if="inputSchema">
      <p-markdown-renderer v-if="inputDescription" :text="inputDescription" />
    </template>

    <p v-else>
      Do you want to resume this flow run?
    </p>

    <template v-if="inputSchema">
      <SchemaInputV2 v-model:values="parameters" :schema="inputSchema" :errors="[]" :kinds="['none', 'json', 'workspace_variable']" />
    </template>

    <template #actions>
      <p-button primary @click="resume">
        Submit
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useValidationObserver } from '@prefecthq/vue-compositions'
  import { ref } from 'vue'
  import { useFlowRun, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { SchemaV2, SchemaValuesV2, SchemaInputV2 } from '@/schemas'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const showModal = defineModel<boolean>('showModal')
  const api = useWorkspaceApi()
  const parameters = ref<SchemaValuesV2>({})

  const { validate } = useValidationObserver()
  const { flowRun, subscription } = useFlowRun(() => props.flowRunId)

  let serverValidationError: string
  let inputDescription: string | null
  let inputSchema: SchemaV2

  if (flowRun.value?.state?.stateDetails?.runInputKeyset) {
    [inputDescription, inputSchema] = await Promise.all([
      api.flowRuns.getFlowRunInputDescription(props.flowRunId, flowRun.value.state.stateDetails.runInputKeyset),
      api.flowRuns.getFlowRunInputSchemaV2(props.flowRunId, flowRun.value.state.stateDetails.runInputKeyset),
    ])
  }

  const resume = async (): Promise<void> => {
    const valid = await validate()

    if (!valid) {
      return
    }

    try {
      const response = await api.flowRuns.resumeFlowRunV2(props.flowRunId, parameters.value)

      if (response.status != 'ACCEPT') {
        showToast(localization.error.resumeFlowRun, 'error')
        console.log('Orchestration failed: ', response.details.reason)
        serverValidationError = response.details.reason
        return
      }

      subscription.refresh()
      showModal.value = false
      showToast(localization.success.resumeFlowRun, 'success')

      if (serverValidationError) {
        serverValidationError = ''
      }

    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.resumeFlowRun)
      showToast(message, 'error')
    }
  }
</script>
