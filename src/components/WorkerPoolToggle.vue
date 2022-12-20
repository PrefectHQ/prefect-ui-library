<template>
  <p-toggle v-if="can.update.worker_pool" v-model="internalValue" :state="state" />
</template>

<script lang="ts" setup>
  import { PToggle, showToast, State } from '@prefecthq/prefect-design'
  import { computed, reactive } from 'vue'
  import { useCan, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkerPool } from '@/models'

  const props = defineProps<{
    workerPool: WorkerPool,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()

  const internalValue = computed({
    get() {
      return !!props.workerPool.isPaused
    },
    set(value: boolean) {
      toggle(value)
    },
  })

  const state = reactive({ pending: false } as State)

  const toggle = async (value: boolean): Promise<void> => {
    state.pending = true

    try {
      if (value) {
        await api.workerPools.updateWorkerPool(props.workerPool.name, { isPaused: true })

        showToast(localization.success.pauseWorkerPool, 'success')
      } else {
        await api.workerPools.updateWorkerPool(props.workerPool.name, { isPaused: false })

        showToast(localization.success.activateWorkerPool, 'success')
      }

      emit('update')
    } catch (error) {
      const message = value ? localization.error.pauseWorkerPool : localization.error.activateWorkerPool
      showToast(message)

      console.error(error)
    } finally {
      state.pending = false
    }
  }
</script>

