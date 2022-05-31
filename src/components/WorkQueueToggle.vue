<template>
  <p-toggle v-model="isActive" />
</template>

<script lang="ts" setup>
  import  { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { WorkQueue } from '@/models'
  import { workQueuesApiKey } from '@/services/WorkQueuesApi'
  import { inject } from '@/utilities'
  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const workQueuesApi = inject(workQueuesApiKey)

  const emit = defineEmits<{
    (event: 'update:workQueue', value: WorkQueue): void,

  }>()

  const internalValue = computed({
    get() {
      return props.workQueue
    },
    set(value: WorkQueue) {
      emit('update:workQueue', value)
    },
  })

  let shouldUpdate: boolean = true

  const setToggle = async (value: boolean): Promise<void> => {
    if (!shouldUpdate) {
      shouldUpdate = true
      return
    }

    try {
      if (value) {
        await workQueuesApi.resumeWorkQueue(props.workQueue.id)
        showToast(`${props.workQueue.name} active`, 'success', undefined, 3000)
      } else {
        await workQueuesApi.pauseWorkQueue(props.workQueue.id)
        showToast(`${props.workQueue.name} paused`, 'error', undefined, 3000)
      }
    } catch (error) {
      showToast(`${error}`, 'error', undefined, 3000)

      shouldUpdate = false
      isActive.value = !isActive.value
    }
  }

  const isActive = computed({
    get() {
      return !internalValue.value.isPaused
    },
    set(value: boolean) {
      internalValue.value = new WorkQueue({ ...internalValue.value, isPaused: !value })
      setToggle(value)
    },
  })
</script>
