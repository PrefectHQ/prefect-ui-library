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


      <section class="mt-4 flex flex-col gap-4">
        <p-key-value label="Raw" :value="intervalSchedule.interval" />
        <p-key-value label="String" :value="intervalSchedule.toString()" />
        <p-key-value label="Prose" :value="intervalSchedule.toProseString()" />
      </section>
    </demosubsection>
  </DemoSection>
</template>

<script lang="ts">
  declare global {
    interface Intl {
      supportedValuesOf: (key: string) => [],
    }
  }

  if (Intl && !('supportedValuesOf' in Intl)) {
    Intl.supportedValuesOf = (key: string) => []
  }
</script>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { IntervalSchedule } from '@/models'


  const interval = ref(31540000)
  const intervalTimezone = ref(null)
  const intervalAnchorDate = ref(new Date())

  // TODO: Doesn't work on Safari
  const timeZoneOptions = [
    { label: 'UTC', value: null }, ...Intl.supportedValuesOf('timeZone').map((timezone: string) => {
      return { label: timezone, value: timezone }
    }),
  ]

  const intervalSchedule = computed(() => {
    return new IntervalSchedule({ interval: interval.value, timezone: intervalTimezone.value, anchorDate: intervalAnchorDate.value })
  })
</script>