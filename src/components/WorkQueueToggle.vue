<template>
  <p-toggle v-if="can.update.work_queue" v-model="internalValue" :loading="loading" />
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'
  import { WorkQueue } from '@/models'
  import { workQueuesApiKey } from '@/services/WorkQueuesApi'
  import { inject } from '@/utilities'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const workQueuesApi = inject(workQueuesApiKey)
  const can = useCan()

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
        await workQueuesApi.resumeWorkQueue(props.workQueue.id)

        showToast(localization.success.activateWorkQueue, 'success')
      } else {
        await workQueuesApi.pauseWorkQueue(props.workQueue.id)

        showToast(localization.success.pauseWorkQueue, 'success')
      }

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

