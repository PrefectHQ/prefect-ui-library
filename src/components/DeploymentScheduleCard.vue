<template>
  <p-list-item class="schedule-card">
    <p-tooltip :text="schedule.schedule?.toString({ verbose: true })">
      <div class="schedule-card__content">
        {{ schedule.schedule?.toString({ verbose: false }) }}
      </div>
    </p-tooltip>
    <div class="schedule-card__action">
      <DeploymentScheduleToggle :deployment="deployment" :schedule="deploymentSchedule" @update="updateActiveStatus" />
      <DeploymentScheduleMenu
        class="deployment-schedule__menu"
        size="xs"
        show-all
        :deployment="deployment"
        :schedule="deploymentSchedule"
        @update="scheduleUpdated"
        @delete="emit('update')"
      />
    </div>
  </p-list-item>
</template>


<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import { DeploymentScheduleMenu, DeploymentScheduleToggle } from '@/components'
  import { Deployment, DeploymentSchedule, DeploymentScheduleCompat } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
    deploymentSchedule: DeploymentSchedule,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const internalValue = ref<DeploymentScheduleCompat>({ 'active': props.deploymentSchedule.active, 'schedule': props.deploymentSchedule.schedule })
  const schedule = computed({
    get: () => {
      return internalValue.value
    },
    set: (value: DeploymentScheduleCompat) => {
      internalValue.value = value
    },
  })

  const updateActiveStatus = (value: boolean): void => {
    schedule.value.active = value
    emit('update')
  }

  const scheduleUpdated = (schedule: DeploymentScheduleCompat): void => {
    internalValue.value = schedule
  }

  const updateInternalState = (): void => {
    internalValue.value = { 'active': props.deploymentSchedule.active, 'schedule': props.deploymentSchedule.schedule }
  }
  watch(() => props.deploymentSchedule, updateInternalState)
</script>
