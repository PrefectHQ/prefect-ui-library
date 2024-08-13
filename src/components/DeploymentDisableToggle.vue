<template>
  <p-tooltip :text="tooltipText" side="left">
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
      return !props.deployment.disabled
    },
    set(value: boolean) {
      if (value) {
        toggleDeploymentEnabled(true)
      } else {
        toggleDeploymentEnabled(false)
      }
    },
  })

  const tooltipText = computed(() => {
    return props.deployment.disabled ? localization.info.deploymentDisabled : localization.info.deploymentEnabled
  })

  const state = reactive<State>({ pending: false, valid: true, validated: false })

  const toggleDeploymentEnabled = async (value: boolean): Promise<void> => {
    state.pending = true
    const message = value ? localization.success.enableDeployment : localization.success.disableDeployment

    try {
      if (value) {
        await api.deployments.enableDeployment(props.deployment.id)
      } else {
        await api.deployments.disableDeployment(props.deployment.id)
      }
      showToast(message, 'success')
      emit('update')
    } catch (error) {
      const defaultMessage = value ? localization.error.enableDeployment : localization.error.disableDeployment

      const message = getApiErrorMessage(error, defaultMessage)
      showToast(message, 'error')

      console.error(error)
    } finally {
      state.pending = false
    }
  }
</script>

