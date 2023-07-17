<template>
  <p-tooltip text="Pause or resume this work queue">
    <p-toggle v-if="can.update.work_queue" v-model="internalValue" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed, toRefs } from 'vue'
  import { useCan, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkPoolQueue } from '@/models'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueue: WorkPoolQueue,
  }>()

  const { workPoolName } = toRefs(props)
  const { workPoolQueue } = toRefs(props)

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()

  const internalValue = computed({
    get() {
      return !props.workPoolQueue.isPaused
    },
    set(value: boolean) {
      toggle(value)
    },
  })

  const toggle = async (value: boolean): Promise<void> => {

    try {
      if (value) {
        await api.workPoolQueues.resumeWorkPoolQueue(workPoolName.value, workPoolQueue.value.name)

        showToast(localization.success.activateWorkPoolQueue, 'success')
      } else {
        await api.workPoolQueues.pauseWorkPoolQueue(workPoolName.value, workPoolQueue.value.name)

        showToast(localization.success.pauseWorkPoolQueue, 'success')
      }

      emit('update')
    } catch (error) {
      const message = value ? localization.error.pauseWorkPoolQueue : localization.error.activateWorkPoolQueue
      showToast(message)

      console.error(error)
    }
  }
</script>