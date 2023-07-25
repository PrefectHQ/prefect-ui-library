<template>
  <p-tooltip text="Pause or resume this work queue">
    <p-toggle v-if="can.update.work_queue" v-model="internalValue" :loading="loading" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const can = useCan()

  const api = useWorkspaceApi()
  const workQueueName = computed(() => props.workQueue.name)
  const workQueueSubscription = useSubscription(api.workQueues.getWorkQueueByName, [workQueueName])

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const internalValue = computed({
    get() {
      return !props.workQueue.isPaused
    },
    set(value: boolean) {
      toggleWorkQueue(value)
    },
  })

  const loading = ref(false)

  const toggleWorkQueue = async (value: boolean): Promise<void> => {
    loading.value = true

    try {
      if (value) {
        await api.workQueues.resumeWorkQueue(props.workQueue.id)

        showToast(localization.success.activateWorkQueue, 'success')
      } else {
        await api.workQueues.pauseWorkQueue(props.workQueue.id)

        showToast(localization.success.pauseWorkQueue, 'success')
      }

      workQueueSubscription.refresh()
      emit('update')
    } catch (error) {
      const message = value ? localization.error.activateWorkQueue : localization.error.pauseWorkQueue

      showToast(message, 'error')

      console.error(error)
    } finally {
      loading.value = false
    }
  }
</script>

