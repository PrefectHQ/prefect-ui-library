<template>
  <p-toggle v-if="can.update.worker_pool_queue" v-model="internalValue" />
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed, toRefs } from 'vue'
  import { useCan, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkerPoolQueue } from '@/models'

  const props = defineProps<{
    workerPoolName: string,
    workerPoolQueue: WorkerPoolQueue,
  }>()

  const { workerPoolName } = toRefs(props)
  const { workerPoolQueue } = toRefs(props)

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()

  const internalValue = computed({
    get() {
      return !props.workerPoolQueue.isPaused
    },
    set(value: boolean) {
      toggle(value)
    },
  })

  const toggle = async (value: boolean): Promise<void> => {

    try {
      if (value) {
        await api.workerPoolQueues.resumeWorkerPoolQueue(workerPoolName.value, workerPoolQueue.value.name)

        showToast(localization.success.activateWorkerPoolQueue, 'success')
      } else {
        await api.workerPoolQueues.pauseWorkerPoolQueue(workerPoolName.value, workerPoolQueue.value.name)

        showToast(localization.success.pauseWorkerPoolQueue, 'success')
      }

      emit('update')
    } catch (error) {
      const message = value ? localization.error.pauseWorkerPoolQueue : localization.error.activateWorkerPoolQueue
      showToast(message)

      console.error(error)
    }
  }
</script>