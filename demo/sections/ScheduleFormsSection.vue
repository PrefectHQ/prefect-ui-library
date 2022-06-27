<template>
  <DemoSection heading="Schedule Forms">
    <DemoSubSection heading="Interval">
      <p class="mb-4">
        Current schedule (save to update): <span class="font-semibold">{{ intervalSchedule }}</span>
      </p>

      <IntervalScheduleForm hide-footer :schedule="intervalSchedule" @submit="updateIntervalSchedule" />
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


  const intervalSchedule = ref(new IntervalSchedule({ interval: 3600, timezone: null, anchorDate: null }))
  const cronSchedule = ref(new CronSchedule({ cron: '* * * * *', timezone: null, dayOr: false }))

  const updateIntervalSchedule = (value: IntervalSchedule): void => {
    intervalSchedule.value = value
  }

  const updateCronSchedule = (value: CronSchedule): void => {
    cronSchedule.value = value
  }
</script>