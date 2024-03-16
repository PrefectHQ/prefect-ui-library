<template>
  <p-list-item class="deployment-schedule-card">
    <p-tooltip :text="internalValue.schedule?.toString({ verbose: true })">
      <div class="deployment-schedule-card__content">
        {{ internalValue.schedule?.toString({ verbose: false }) }}
      </div>
    </p-tooltip>
    <div class="deployment-schedule-card__action">
      <DeploymentScheduleToggle :deployment="deployment" :schedule="deploymentSchedule" @update="updateActiveStatus" />
      <DeploymentScheduleMenu
        class="deployment-schedule__menu"
        small
        :deployment="deployment"
        :schedule="deploymentSchedule"
        @update="scheduleUpdated"
        @delete="emit('update')"
      />
    </div>
  </p-list-item>
</template>


<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { DeploymentScheduleMenu, DeploymentScheduleToggle } from '@/components'
  import { Deployment, DeploymentSchedule, DeploymentScheduleCompatible } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
    deploymentSchedule: DeploymentSchedule,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const internalValue = ref<DeploymentScheduleCompatible>({ active: props.deploymentSchedule.active, schedule: props.deploymentSchedule.schedule, jobVariables: props.deploymentSchedule.jobVariables })

  const updateActiveStatus = (value: boolean): void => {
    internalValue.value.active = value
    emit('update')
  }

  const scheduleUpdated = (schedule: DeploymentScheduleCompatible): void => {
    internalValue.value = schedule
  }

  const updateInternalState = (): void => {
    internalValue.value = { active: props.deploymentSchedule.active, schedule: props.deploymentSchedule.schedule, jobVariables: props.deploymentSchedule.jobVariables }
  }
  watch(() => props.deploymentSchedule, updateInternalState)
</script>

<style>
.deployment-schedule-card { @apply
  pl-3
  pr-2
  py-2
  flex
  flex-row
  text-sm
  w-full
  justify-between
  items-center
}

.deployment-schedule-card__action { @apply
  inline-flex
  items-center
  gap-2
}
</style>