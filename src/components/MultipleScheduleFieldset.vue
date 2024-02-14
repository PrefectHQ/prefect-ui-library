<template>
  <p-label label="Schedules" />
  <template v-for="deploymentSchedule in deployment.schedules" :key="deploymentSchedule.id">
    <p-list-item class="schedule-card">
      <p-tooltip :text="deploymentSchedule.schedule.toString({ verbose: true })">
        <div class="schedule-card__content">
          {{ deploymentSchedule.schedule.toString({ verbose: false }) }}
        </div>
      </p-tooltip>
      <div class="schedule-card__action">
        <DeploymentScheduleToggle :deployment="deployment" :schedule="deploymentSchedule" @update="emit('update')" />
        <DeploymentScheduleMenu
          class="deployment-schedule__menu"
          size="xs"
          show-all
          :deployment="deployment"
          :schedule="deploymentSchedule"
          @delete="emit('update')"
        />
      </div>
    </p-list-item>

    <ScheduleFormModal @submit="createSchedule">
      <template #default="{ open }">
        <p-button small icon="PlusIcon" class="schedule-fieldset__button" @click="open">
          Schedule
        </p-button>
      </template>
    </ScheduleFormModal>
  </template>
</template>


<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { DeploymentScheduleMenu, DeploymentScheduleToggle } from '@/components'
  import ScheduleFormModal from '@/components/ScheduleFormModal.vue'
  import { useCan, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment, DeploymentScheduleCompat, Schedule } from '@/models'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()

  const loading = ref(false)

  const createSchedule = (schedule: DeploymentScheduleCompat): void => {
    loading.value = true
    try {
      // await api.deploymentSchedules.updateDeploymentSchedule(props.deployment.id, props.schedule.id, { active: value })
      // showToast(value ? localization.success.activateDeploymentSchedule : localization.success.pauseDeploymentSchedule, 'success')
      emit('update')
    } catch (error) {
      // const defaultMessage = value ? localization.error.activateDeploymentSchedule : localization.error.pauseDeploymentSchedule
      // const message = getApiErrorMessage(error, defaultMessage)
      showToast(message, 'error')
    } finally {
      loading.value = false
    }
  }
</script>

<style>
.schedule-fieldset__button { @apply
  max-w-fit
}

.schedule-fieldset__schedule { @apply
  flex
  gap-2
  flex-col
}

.schedule-fieldset__buttons { @apply
  flex
  gap-2
}
</style>