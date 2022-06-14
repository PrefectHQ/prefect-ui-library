<template>
  <DemoSection heading="Schedules">
    <DemoSubSection heading="Interval">
      <sup>
        Note: Due to leap seconds/years, interval schedules are only displayed to the day boundary.
      </sup>

      <div class="grid grid-cols-3 gap-2">
        <p-label label="Seconds">
          <p-number-input v-model="interval" />
        </p-label>

        <p-label label="Anchor Date">
          <p-date-input v-model="intervalAnchorDate" />
        </p-label>

        <p-label label="Timezone">
          <p-combobox v-model="intervalTimezone" :options="timeZoneOptions" />
        </p-label>
      </div>


      <section class="mt-4 flex flex-col gap-4">
        <p-key-value label="Raw" :value="intervalSchedule.interval" />
        <p-key-value label="String" :value="intervalSchedule.toString()" />
        <p-key-value label="Prose" :value="intervalSchedule.toProseString()" />
      </section>
    </DemoSubSection>

    <p-divider class="my-8" />

    <DemoSubSection heading="Cron">
      <sup>
        Note: This cron display does not currently support cron strings that contain hashes, keyword expressions (e.g.
        <p-code>@daily</p-code>), <p-code>R</p-code>/<p-code>RANDOM</p-code> expressions, or <p-code>fcron</p-code>
        strings.
      </sup>

      <div class="grid grid-cols-3 gap-2">
        <p-label label="Cron string">
          <p-text-input v-model="cron" />
        </p-label>

        <p-label label="Timezone">
          <p-combobox v-model="cronTimezone" :options="timeZoneOptions" />
        </p-label>
      </div>

      <p-label label="Day Or" class="mt-2">
        <p-toggle v-model="cronDayOr" />
      </p-label>


      <section class="mt-4 flex flex-col gap-4">
        <p-key-value label="Raw" :value="cronSchedule.cron" />
        <p-key-value label="String" :value="cronSchedule.toString()" />
        <p-key-value label="Prose" :value="cronSchedule.toProseString()" />
      </section>
    </DemoSubSection>

    <p-divider class="my-8" />

    <DemoSubSection heading="RRule">
      <sup>
        ... nothing yet
      </sup>

      <div class="grid grid-cols-3 gap-2">
        <p-label label="RRule">
          <p-text-input v-model="rrule" />
        </p-label>

        <p-label label="Timezone">
          <p-combobox v-model="rruleTimezone" :options="timeZoneOptions" />
        </p-label>
      </div>

      <section class="mt-4 flex flex-col gap-4">
        <p-key-value label="Raw" :value="rruleSchedule.rrule" />
        <p-key-value label="String" :value="rruleSchedule.toString()" />
        <p-key-value label="Prose" :value="rruleSchedule.toProseString()" />
      </section>
    </DemoSubSection>
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
  import { CronSchedule, IntervalSchedule, RRuleSchedule } from '@/models'

  // TODO: Doesn't work on Safari
  const timeZoneOptions = [
    { label: 'UTC', value: null }, ...Intl.supportedValuesOf('timeZone').map((timezone: string) => {
      return { label: timezone, value: timezone }
    }),
  ]


  const interval = ref(3600)
  const intervalTimezone = ref(null)
  const intervalAnchorDate = ref(new Date())

  const intervalSchedule = computed(() => {
    return new IntervalSchedule({ interval: interval.value, timezone: intervalTimezone.value, anchorDate: intervalAnchorDate.value })
  })


  const cron = ref('0 0 0 * * 1L')
  const cronTimezone = ref(null)
  const cronDayOr = ref(false)

  const cronSchedule = computed(() => {
    return new CronSchedule({ cron: cron.value, timezone: cronTimezone.value, dayOr: cronDayOr.value })
  })

  const rrule = ref('DTSTART:20120201T023000Z\nRRULE:FREQ=MONTHLY;COUNT=5')
  const rruleTimezone = ref(null)

  const rruleSchedule = computed(() => {
    return new RRuleSchedule({ rrule: rrule.value, timezone: rruleTimezone.value })
  })
</script>