<template>
  <p-modal v-model:showModal="internalValue" :title="rerunModalTitle">
    This will rerun flow run {{ flowRun.name }}.
    <div>
      Any task runs without a
      <p-link :to="localization.docs.resultsPersistence">
        persisted result
      </p-link> will be run again.
    </div>
    <template #actions>
      <p-button variant="default" @click="rerunFromFailed">
        Rerun
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
    rerunningRun: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:showModal' | 'update:rerunningRun', value: boolean): void,
  }>()

  const internalValue = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emits('update:showModal', value)
    },
  })

  const rerunningRun = computed({
    get() {
      return props.rerunningRun
    },
    set(value: boolean) {
      emits('update:rerunningRun', value)
    },
  })

  const rerunModalTitle = computed(() => `Rerun ${props.flowRun.name}?`)

  const api = useWorkspaceApi()

  const rerunFromFailed = async (): Promise<void> => {
    rerunningRun.value = true
    try {
      await api.flowRuns.rerunFlowRun(props.flowRun.id)
      showToast(localization.success.rerunRun, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.rerunRun)
      showToast(message, 'error')
    } finally {
      rerunningRun.value = false
      internalValue.value = false
    }
  }
  </script>
