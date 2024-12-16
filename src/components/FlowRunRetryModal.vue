<template>
  <p-modal v-model:showModal="showModal" :title="`Retry ${flowRun.name}?`">
    This will retry flow run {{ flowRun.name }}.
    <div>
      Any task runs without a
      <p-link :to="localization.docs.resultsPersistence">
        persisted result
      </p-link> will be run again.
    </div>
    <template #actions>
      <p-button variant="default" @click="retryFromFailed">
        Retry
      </p-button>
    </template>
  </p-modal>
</template>

  <script lang="ts" setup>
  import { showToast, PButton } from '@prefecthq/prefect-design'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowRun } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

  const showModal = defineModel<boolean>('showModal', { required: true })
  const retryingRun = defineModel<boolean>('retryingRun', { required: true })

  const { flowRun } = defineProps<{
    flowRun: FlowRun,
  }>()

  const emits = defineEmits(['update'])

  const api = useWorkspaceApi()

  const retryFromFailed = async (): Promise<void> => {
    retryingRun.value = true

    try {
      await api.flowRuns.retryFlowRun(flowRun.id)
      showToast(localization.success.retryRun, 'success')
      emits('update')
      showModal.value = false
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.retryRun)
      showToast(message, 'error')
    } finally {
      retryingRun.value = false
    }
  }
  </script>
