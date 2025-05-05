<template>
  <p-tooltip :text="tooltipText" side="left">
    <p-toggle v-model="internalValue" :disabled="loading || deployment.paused || deployment.disabled || !deployment.can.update" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment, DeploymentSchedule } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

  const { deployment, schedule } = defineProps<{
    deployment: Deployment,
    schedule: DeploymentSchedule,
  }>()

  const emit = defineEmits<{
    (event: 'update', value: boolean): void,
  }>()

  const api = useWorkspaceApi()

  const internalValue = computed({
    get() {
      return !!schedule.active
    },
    set(value: boolean) {
      updateSchedule(value)
    },
  })

  const loading = ref(false)

  const tooltipText = computed(() => {
    if (!deployment.can.update) {
      return localization.info.deploymentUpdateDisabled
    }
    return 'Pause or resume this schedule'
  })

  const updateSchedule = async (value: boolean): Promise<void> => {
    loading.value = true
    try {
      await api.deploymentSchedules.updateDeploymentSchedule(
        deployment.id,
        schedule.id,
        {
          slug: schedule.slug,
          schedule: schedule.schedule,
          parameters: schedule.parameters ?? undefined,
          active: value,
        },
      )
      showToast(value ? localization.success.activateDeploymentSchedule : localization.success.pauseDeploymentSchedule, 'success')
      emit('update', value)
    } catch (error) {
      const defaultMessage = value ? localization.error.activateDeploymentSchedule : localization.error.pauseDeploymentSchedule
      const message = getApiErrorMessage(error, defaultMessage)
      showToast(message, 'error')
    } finally {
      loading.value = false
    }
  }
</script>

