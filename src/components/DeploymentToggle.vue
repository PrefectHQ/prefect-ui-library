<template>
  <p-toggle v-if="can.update.deployment" v-model="internalValue" :loading="loading" :disabled="deployment.deprecated" />
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const deploymentsApi = inject(deploymentsApiKey)
  const can = inject(canKey)

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

        showToast(localization.success.activateDeployment, 'success')
      } else {
        await deploymentsApi.pauseDeployment(props.deployment.id)

        showToast(localization.success.pauseDeployment, 'success')
      }

      emit('update')
    } catch (error) {
      const message = value ? localization.error.activateDeployment : localization.error.pauseDeployment

      showToast(message)

      console.error(error)
    } finally {
      loading.value = false
    }
  }
</script>

