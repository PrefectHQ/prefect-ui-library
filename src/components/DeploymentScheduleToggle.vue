<template>
  <p-tooltip text="Pause or resume this schedule">
    <p-toggle v-if="deployment.can.update" v-model="internalValue" :disabled="loading" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment, DeploymentSchedule } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    deployment: Deployment,
    schedule: DeploymentSchedule,
  }>()

  const emit = defineEmits<{
    (event: 'update', value: boolean): void,
  }>()

  const api = useWorkspaceApi()

  const internalValue = computed({
    get() {
      return !!props.schedule.active
    },
    set(value: boolean) {
      updateSchedule(value)
    },
  })

  const loading = ref(false)

  const updateSchedule = async (value: boolean): Promise<void> => {
    loading.value = true
    try {
      await api.deploymentSchedules.updateDeploymentSchedule(props.deployment.id, props.schedule.id, { active: value })
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

