<template>
  <DemoSection heading="Schedule Displays">
    <DemoSubSection heading="Interval">
      <sup>
        Note: Due to leap seconds/years, interval schedules are only displayed to the day boundary.
      </sup>

      <div class="grid grid-cols-3 gap-2">
        <p-label label="Seconds">
          <p-number-input v-model="interval" />
        </p-label>

        <p-label label="Anchor Date">
          <p-date-input v-model="intervalAnchorDate" show-time />
        </p-label>

        <p-label label="Timezone">
          <p-combobox v-model="intervalTimezone" :options="timeZoneOptions" />
        </p-label>
      </div>


      <section class="mt-4 flex flex-col gap-4">
        <p-key-value label="Raw" :value="intervalSchedule.raw" />
        <p-key-value label="String" :value="intervalSchedule" />
        <p-key-value label="Verbose" :value="intervalSchedule.toString({ verbose: true })" />
      </section>
    </DemoSubSection>

    <p-divider class="my-8" />

    <DemoSubSection heading="Cron">
      <sup>
        Note: this cron display supports keyword (e.g.
        <p-code>@daily</p-code>) and <p-code>R</p-code>/<p-code>RANDOM</p-code> expressions as singletons but not as
        part of range, CSV, or hashed expressions.
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
        <p-key-value label="Raw" :value="cronSchedule.raw" />
        <p-key-value label="String" :value="cronSchedule" />
        <p-key-value label="Verbose" :value="cronSchedule.toString({ verbose: true })" />
      </section>
    </DemoSubSection>

    <p-divider class="my-8" />

    <DemoSubSection heading="RRule">
      <sup>
        It's not entirely clear how timezone should impact the RRule schedules since timezone is also included in the
        string and could differ from the API model

        <br>

        This schedule parsing isn't stellar so there will be some iffy sentences.
      </sup>

      <div class="grid grid-cols-3 gap-2">
        <p-label label="RRule">
          <p-text-input v-model="rrule" />
        </p-label>

        <p-label label="Timezone">
          <p-combobox v-model="rruleTimezone" :options="timeZoneOptions" disabled />
        </p-label>
      </div>

      <section class="mt-4 flex flex-col gap-4">
        <p-key-value label="Raw" :value="rruleSchedule.rrule" />
        <p-key-value label="String" :value="rruleSchedule.toString()" />
      </section>
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { timezones } from '..//utilities/intl'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { CronSchedule, IntervalSchedule, RRuleSchedule  } from '@/models'

  // TODO: Doesn't work on Safari
  const timeZoneOptions = timezones

  const interval = ref(3600)
  const intervalTimezone = ref(null)
  const intervalAnchorDate = ref(new Date())

  const intervalSchedule = computed(() => {
    return new IntervalSchedule({ interval: interval.value, timezone: intervalTimezone.value, anchorDate: intervalAnchorDate.value })
  })


  const cron = ref('* * * * * *')
  const cronTimezone = ref(null)
  const cronDayOr = ref(true)

  const cronSchedule = computed(() => {
    return new CronSchedule({ cron: cron.value, timezone: cronTimezone.value, dayOr: cronDayOr.value })
  })

  const rrule = ref('DTSTART:20120201T023000Z\nRRULE:FREQ=MONTHLY;COUNT=5')
  const rruleTimezone = ref(null)

  const rruleSchedule = computed(() => {
    return new RRuleSchedule({ rrule: rrule.value, timezone: rruleTimezone.value })
  })
</script>