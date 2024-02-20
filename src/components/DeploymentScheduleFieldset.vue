<template>
  <div class="deployment-details__schedules-sidebar">
    <template v-for="deploymentSchedule in schedules" :key="deploymentSchedule.id">
      <DeploymentScheduleCard :deployment="deployment" :deployment-schedule="deploymentSchedule" @update="emits('update')" />
    </template>

    <ScheduleFormModal v-if="deployment.can.update" :active="null" :schedule="null" @submit="createSchedule">
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
</script>