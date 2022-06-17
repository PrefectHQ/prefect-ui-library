<template>
  <DemoSection heading="Schedule Forms">
    <DemoSubSection heading="Interval">
      <IntervalScheduleForm v-model="intervalSchedule" />
    </DemoSubSection>

    <p-divider class="my-8" />

    <DemoSubSection heading="Cron">
      <em>Coming soon</em>
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import IntervalScheduleForm from '@/components/IntervalScheduleForm.vue'
  import { IntervalSchedule } from '@/models'

  const intervalSchedule = ref(new IntervalSchedule({ interval: 3600, timezone: null, anchorDate: null }))
</script>