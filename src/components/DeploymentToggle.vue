<template>
  <p-toggle v-model="internalValue" :loading="loading" />
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { Deployment } from '@/models'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { inject } from '@/utilities'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const deploymentsApi = inject(deploymentsApiKey)

  const internalValue = computed({
    get() {
      return !!props.deployment.isScheduleActive
    },
    set(value: boolean) {
      toggleDeploymentSchedule(value)
    },
  })

  const loading = ref(false)

  const toggleDeploymentSchedule = async (value: boolean): Promise<void> => {
    loading.value = true

    try {
      if (value) {
        await deploymentsApi.resumeDeployment(props.deployment.id)
        showToast(`${props.deployment.name} active`, 'success', undefined, 3000)
      } else {
        await deploymentsApi.pauseDeployment(props.deployment.id)
        showToast(`${props.deployment.name} paused`, 'error', undefined, 3000)
      }

      emit('update')
    } catch (error) {
      showToast(`${error}`, 'error', undefined, 3000)
    } finally {
      loading.value = false

    }
  }
</script>

