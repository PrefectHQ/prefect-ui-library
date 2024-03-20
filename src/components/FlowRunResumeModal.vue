<template>
  <p-modal v-if="flowRun" v-model:showModal="showModal" title="Resume Flow Run">
    <template v-if="schema">
      <p-markdown-renderer v-if="description" :text="description" />

      <p-content v-if="schema">
        <SchemaInputV2 v-model:values="parameters" :schema="schema" :errors="errors" :kinds="['none', 'json', 'workspace_variable']" />
      </p-content>
    </template>

    <p v-else>
      Do you want to resume this flow run?
    </p>

    <template #actions>
      <p-button primary @click="resume">
        Submit
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { ref, watch } from 'vue'
  import { useFlowRun, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { SchemaV2, SchemaValuesV2, SchemaInputV2, useSchemaValidationV2 } from '@/schemas'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const showModal = defineModel<boolean>('showModal')
  const api = useWorkspaceApi()
  const parameters = ref<SchemaValuesV2>({})
  const { flowRun, subscription } = useFlowRun(() => props.flowRunId)

  const description = ref<string | null>(null)
  const schema = ref<SchemaV2 | null>(null)

  const { errors, validate, reset } = useSchemaValidationV2(schema, parameters)

  watch(showModal, (open) => {
    if (!open) {
      clear()
      return
    }

    init()
  }, { immediate: true })

  async function init(): Promise<void> {
    if (!flowRun.value?.state?.stateDetails?.runInputKeyset) {
      return
    }

    const [descriptionValue, schemaValue] = await Promise.all([
      api.flowRuns.getFlowRunInputDescription(props.flowRunId, flowRun.value.state.stateDetails.runInputKeyset),
      api.flowRuns.getFlowRunInputSchemaV2(props.flowRunId, flowRun.value.state.stateDetails.runInputKeyset),
    ])

    description.value = descriptionValue
    schema.value = schemaValue
  }

  function clear(): void {
    description.value = null
    schema.value = null
    parameters.value = {}
    reset()
  }

  const resume = async (): Promise<void> => {
    const valid = await validate()

    if (!valid) {
      return
    }

    try {
      const response = await api.flowRuns.resumeFlowRunV2(props.flowRunId, parameters.value)

      if (response.status != 'ACCEPT') {
        showToast(response.details.reason, 'error')
        console.log('Orchestration failed: ', response.details.reason)
        return
      }

      subscription.refresh()
      showModal.value = false
      showToast(localization.success.resumeFlowRun, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.resumeFlowRun)
      showToast(message, 'error')
    }
  }
</script>
