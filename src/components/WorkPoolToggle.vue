<template>
  <p-tooltip text="Pause or resume this work pool">
    <p-toggle v-if="workPool.can.update" v-model="internalValue" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useCan, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkPool } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    workPool: WorkPool,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()

  const internalValue = computed({
    get() {
      return !props.workPool.isPaused
    },
    set(value: boolean) {
      toggle(value)
    },
  })

  const toggle = async (value: boolean): Promise<void> => {
    try {
      if (value) {
        await api.workPools.resumeWorkPool(props.workPool.name)

        showToast(localization.success.activateWorkPool, 'success')
      } else {
        await api.workPools.pauseWorkPool(props.workPool.name)

        showToast(localization.success.pauseWorkPool, 'success')
      }

      emit('update')
    } catch (error) {
      const defaultMessage = value ? localization.error.pauseWorkPool : localization.error.activateWorkPool
      const message = getApiErrorMessage(error, defaultMessage)
      showToast(message, 'error')

      console.error(error)
    }
  }
</script>
