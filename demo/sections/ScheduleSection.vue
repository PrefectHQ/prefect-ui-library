<template>
  <DemoSection heading="Schedules">
    <DemoSubSection heading="Interval">
      <div class="grid grid-cols-3 gap-2">
        <p-label label="Seconds">
          <p-number-input v-model="interval" />
        </p-label>

        <p-label label="Timezone">
          <p-combobox v-model="intervalTimezone" :options="timeZoneOptions" />
        </p-label>

        <p-label label="Anchor Date">
          <p-date-input v-model="intervalAnchorDate" />
        </p-label>
      </div>

      {{ intervalSchedule }}
    </demosubsection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { IntervalSchedule } from '@/models'

  const interval = ref(31540000)
  const intervalTimezone = ref(null)
  const intervalAnchorDate = ref(new Date())

  const timeZoneOptions = [
    { label: 'UTC', value: null }, ...Intl.supportedValuesOf('timeZone').map((timezone) => {
      return { label: timezone, value: timezone }
    }),
  ]

  const intervalSchedule = computed(() => {
    return new IntervalSchedule({ interval: interval.value, timezone: intervalTimezone.value, anchorDate: intervalAnchorDate.value })
  })
</script>