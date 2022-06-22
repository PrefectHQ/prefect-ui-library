<template>
  <DemoSection heading="Schedule Forms">
    <DemoSubSection heading="Interval">
      <IntervalScheduleForm :schedule="intervalSchedule" />
    </DemoSubSection>

    <p-divider class="my-8" />

    <DemoSubSection heading="Cron">
      <CronScheduleForm :schedule="cronSchedule" />
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
</script>