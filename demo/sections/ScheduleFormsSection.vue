<template>
  <DemoSection heading="Schedule Forms">
    <DemoSubSection heading="Interval">
      <p class="mb-4">
        Current schedule (save to update): <span class="font-semibold">{{ intervalSchedule }}</span>
      </p>

      <IntervalScheduleForm v-model:schedule="intervalSchedule" @submit="updateIntervalSchedule" />
    </DemoSubSection>

    <p-divider class="my-8" />

    <DemoSubSection heading="Cron">
      <p class="mb-4">
        Current schedule (save to update): <span class="font-semibold">{{ cronSchedule }}</span>
      </p>

      <CronScheduleForm :schedule="cronSchedule" @submit="updateCronSchedule" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import CronScheduleForm from '@/components/CronScheduleForm.vue'
  import IntervalScheduleForm from '@/components/IntervalScheduleForm.vue'
  import { IntervalSchedule, CronSchedule } from '@/models'
  import { mocker } from '@/services'

  // Bit hacky typing here but don't want to rewrite the mocker to support conditional return values
  const intervalSchedule = ref(mocker.create('schedule', [{ type: 'interval' }]) as IntervalSchedule)
  const cronSchedule = ref(mocker.create('schedule', [{ type: 'cron' }]) as CronSchedule)

  const updateIntervalSchedule = (value: IntervalSchedule): void => {
    intervalSchedule.value = value
  }

  const updateCronSchedule = (value: CronSchedule): void => {
    cronSchedule.value = value
  }
</script>