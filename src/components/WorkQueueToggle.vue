<template>
  <p-toggle v-model="internalValue" :loading="loading" />
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { WorkQueue } from '@/models'
  import { workQueuesApiKey } from '@/services/WorkQueuesApi'
  import { inject } from '@/utilities'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const workQueuesApi = inject(workQueuesApiKey)

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
        showToast(`${props.workQueue.name} active`, 'success', undefined, 3000)
      } else {
        await workQueuesApi.pauseWorkQueue(props.workQueue.id)
        showToast(`${props.workQueue.name} paused`, 'error', undefined, 3000)
      }

      emit('update')
    } catch (error) {
      showToast(`${error}`, 'error', undefined, 3000)
    } finally {
      loading.value = false
    }
  }
</script>

