<template>
  <p-modal v-model:showModal="internalValue" :title="retryModalTitle">
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
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowRun } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    flowRun: FlowRun,
    showModal: boolean,
    retryingRun: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:showModal' | 'update:retryingRun', value: boolean): void,
  }>()

  const internalValue = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emits('update:showModal', value)
    },
  })

  const retryingRun = computed({
    get() {
      return props.retryingRun
    },
    set(value: boolean) {
      emits('update:retryingRun', value)
    },
  })

  const retryModalTitle = computed(() => `Retry ${props.flowRun.name}?`)

  const api = useWorkspaceApi()

  const retryFromFailed = async (): Promise<void> => {
    retryingRun.value = true
    try {
      await api.flowRuns.retryFlowRun(props.flowRun.id)
      showToast(localization.success.retryRun, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.retryRun)
      showToast(message, 'error')
    } finally {
      retryingRun.value = false
      internalValue.value = false
    }
  }
  </script>
