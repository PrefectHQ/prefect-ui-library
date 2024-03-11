<template>
  <div class="deployment-schedule-fieldset">
    <template v-for="deploymentSchedule in schedules.toSorted(sortByCreated)" :key="deploymentSchedule.id">
      <DeploymentScheduleCard :deployment="deployment" :deployment-schedule="deploymentSchedule" @update="emits('update')" />
    </template>

    <ScheduleFormModal v-if="deployment.can.update" :active="null" :schedule="null" :job-variables="{}" @submit="createSchedule">
      <template #default="{ open }">
        <p-button small icon="PlusIcon" @click="open">
          Schedule
        </p-button>
      </template>
    </ScheduleFormModal>
  </div>
</template>

<script lang="ts" setup>
  import { DeploymentScheduleCard, ScheduleFormModal } from '@/components'
  import { Deployment, DeploymentSchedule, DeploymentScheduleCompatible } from '@/models'

  defineProps<{ 'deployment': Deployment, 'schedules': DeploymentSchedule[] }>()

  const emits = defineEmits<{
    (event: 'update'): void,
    (event: 'create', value: DeploymentScheduleCompatible): void,
  }>()

  const createSchedule = (value: DeploymentScheduleCompatible): void => {
    emits('create', value)
  }

  const sortByCreated = (one: DeploymentSchedule, two: DeploymentSchedule): number => {
    return one.created.getTime() - two.created.getTime()
  }
</script>

<style>
.deployment-schedule-fieldset { @apply
  space-y-2
}
</style>