<template>
  <p-list-item class="deployment-schedule-card">
    <p-tooltip :text="deploymentSchedule.schedule.toString({ verbose: true })">
      <div class="deployment-schedule-card__content">
        {{ deploymentSchedule.schedule.toString({ verbose: false }) }}
      </div>
    </p-tooltip>
    <div class="deployment-schedule-card__action">
      <DeploymentScheduleToggle :deployment="deployment" :schedule="deploymentSchedule" @update="$emit('update')" />
      <DeploymentScheduleMenu
        class="deployment-schedule__menu"
        small
        :deployment="deployment"
        :schedule="deploymentSchedule"
        @update="$emit('update')"
        @delete="$emit('update')"
      />
    </div>
  </p-list-item>
</template>


<script lang="ts" setup>
  import { DeploymentScheduleMenu, DeploymentScheduleToggle } from '@/components'
  import { Deployment, DeploymentSchedule } from '@/models'

  defineProps<{
    deployment: Deployment,
    deploymentSchedule: DeploymentSchedule,
  }>()

  defineEmits<{
    (event: 'update'): void,
  }>()
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