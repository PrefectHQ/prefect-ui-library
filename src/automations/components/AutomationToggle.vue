<template>
  <p-toggle v-model="internalValue" :disabled="!can.update.automation" :state="state" />
</template>

<script lang="ts" setup>
  import { PToggle, showToast, State } from '@prefecthq/prefect-design'
  import { computed, reactive } from 'vue'
  import { Automation } from '@/automations/types/automation'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'

  const props = defineProps<{
    automation: Automation,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()

  const internalValue = computed({
    get() {
      return !!props.automation.enabled
    },
    set(value) {
      toggle(value)
    },
  })

  const state = reactive({ pending: false } as State)

  const toggle = async (enabled: boolean): Promise<void> => {
    state.pending = true

    try {
      await api.automations.enableAutomation(props.automation.id, enabled)

      showToast(localization.success.automationEnable(enabled), 'success')
      emit('update')
    } catch (error) {
      showToast(localization.error.automationToggle(enabled))

      console.error(error)
    } finally {
      state.pending = false
    }
  }
</script>

