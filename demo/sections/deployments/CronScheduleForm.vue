<template>
  <ComponentPage title="CronScheduleForm">
    <CronScheduleForm :schedule="schedule" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import CronScheduleForm from '@/components/CronScheduleForm.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { CronSchedule } from '@/models'
  import { mocker } from '@/services'

  const schedule = mocker.create('schedule', [
    {
      type: 'cron',
    },
  ]) as CronSchedule
</script>