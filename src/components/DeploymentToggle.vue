<template>
  <p-tooltip text="Pause or resume scheduling flow runs for this deployment">
    <p-toggle v-if="deployment.can.update" v-model="internalValue" :state :disabled="deployment.deprecated" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { State, showToast } from '@prefecthq/prefect-design'
  import { computed, reactive } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

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

  const state = reactive<State>({ pending: false, valid: true, validated: false })

  const toggleDeploymentSchedule = async (value: boolean): Promise<void> => {
    state.pending = true
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
      state.pending = false
    }
  }
</script>

