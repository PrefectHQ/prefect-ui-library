<template>
  <p-toggle v-model="isActive" />
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { Deployment } from '@/models'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { inject } from '@/utilities'

  const props = defineProps<{
    values: Deployment,
  }>()

  const emit = defineEmits<{
    (event: 'update:values', value: Deployment): void,
  }>()

  const deploymentsApi = inject(deploymentsApiKey)

  const internalValue = computed({
    get() {
      return props.values
    },
    set(value: Deployment) {
      emit('update:values', value)
    },
  })

  const setToggle = async (value: boolean): Promise<void> => {
    try {
      if (value) {
        await deploymentsApi.resumeDeployment(props.values.id)
        showToast(`${props.values.name} active`, 'success', undefined, 3000)
      } else {
        await deploymentsApi.pauseDeployment(props.values.id)
        showToast(`${props.values.name} paused`, 'error', undefined, 3000)
      }
    } catch (error) {
      showToast(`${error}`, 'error', undefined, 3000)
    }
  }

  const isActive = computed({
    get() {
      return !internalValue.value.isScheduleActive
    },
    set(value: boolean) {
      internalValue.value = new Deployment({ ...internalValue.value, isScheduleActive: !value })
      setToggle(value)
    },
  })
</script>

