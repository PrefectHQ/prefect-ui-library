<template>
  <p-tooltip text="Pause or resume this deployment">
    <p-toggle v-if="can.update.deployment" v-model="internalValue" :loading="loading" :disabled="deployment.deprecated" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()

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
        await api.deployments.resumeDeployment(props.deployment.id)

        showToast(localization.success.activateDeployment, 'success')
      } else {
        await api.deployments.pauseDeployment(props.deployment.id)

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

