<template>
  <p-modal v-model:showModal="internalValue" :title="retryModalTitle">
    This will retry flow run {{ flowRun.name }}. Any task runs in a failed, cancelled or crashed state will be run again.
    <template #actions>
      <p-button @click="retryFromFailed">
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
      showToast(localization.error.retryRun, 'error')
    } finally {
      retryingRun.value = false
      internalValue.value = false
    }
  }
  </script>
