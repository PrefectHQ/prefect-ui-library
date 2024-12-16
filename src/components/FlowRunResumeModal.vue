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
      <p-button variant="default" @click="resume">
        Submit
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { ref, watch } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowRun } from '@/models'
  import { SchemaV2, SchemaValuesV2, SchemaInputV2, useSchemaValidationV2 } from '@/schemas'
  import { getApiErrorMessage } from '@/utilities/errors'

  const showModal = defineModel<boolean>('showModal')

  const { flowRun } = defineProps<{
    flowRun: FlowRun,
  }>()

  const emit = defineEmits(['update'])

  const api = useWorkspaceApi()
  const parameters = ref<SchemaValuesV2>({})

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
    if (!flowRun.state?.stateDetails?.runInputKeyset) {
      return
    }

    const [descriptionValue, schemaValue] = await Promise.all([
      api.flowRuns.getFlowRunInputDescription(flowRun.id, flowRun.state.stateDetails.runInputKeyset),
      api.flowRuns.getFlowRunInputSchemaV2(flowRun.id, flowRun.state.stateDetails.runInputKeyset),
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
      const response = await api.flowRuns.resumeFlowRunV2(flowRun.id, parameters.value)

      if (response.status != 'ACCEPT') {
        showToast(response.details.reason, 'error')
        console.log('Orchestration failed: ', response.details.reason)
        return
      }

      emit('update')
      showModal.value = false
      showToast(localization.success.resumeFlowRun, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.resumeFlowRun)
      showToast(message, 'error')
    }
  }
</script>
