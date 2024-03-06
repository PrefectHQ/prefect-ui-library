<template>
  <p-tooltip text="Pause or resume this deployment">
    <p-toggle v-if="deployment.can.update" v-model="internalValue" :loading="loading" :disabled="deployment.deprecated" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { useCan, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

  const can = useCan()

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const api = useWorkspaceApi()

  const internalValue = computed({
    get() {
      return !props.deployment.paused
    },
    set(value: boolean) {
      toggleDeploymentSchedule(value)
    },
  })

  const loading = ref(false)

  const toggleDeploymentSchedule = async (value: boolean): Promise<void> => {
    loading.value = true
    const message = value ? localization.success.activateDeployment : localization.success.pauseDeployment

    try {
      await api.deployments.updateDeployment(props.deployment.id, { paused: !value })

      showToast(message, 'success')
      emit('update')
    } catch (error) {
      const defaultMessage = value ? localization.error.activateDeployment : localization.error.pauseDeployment

      const message = getApiErrorMessage(error, defaultMessage)
      showToast(message, 'error')

      console.error(error)
    } finally {
      loading.value = false
    }
  }
</script>

