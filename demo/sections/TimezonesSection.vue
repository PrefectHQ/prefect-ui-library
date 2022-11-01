<template>
  <DemoSection heading="Timezone">
    <div class="timezones-section">
      <p-label label="Date">
        <DateInput v-model="date" show-time />
      </p-label>

      <p-label label="Timezone">
        <TimezoneSelect v-model="selectedTimezone">
          <template #empty-message>
            <em class="gray-400">browser default</em>
          </template>
        </TimezoneSelect>
      </p-label>

      <div>
        <p-code>UTC Offset (in minutes)</p-code>
        <p>{{ utcOffsetMinutes }}</p>
      </div>

      <div>
        <p-code>JSON (in UTC)</p-code>
        <p>{{ JSON.stringify(date) }}</p>
      </div>

      <div>
        <p-code>formatDate</p-code>
        <p>{{ formatDate(date) }}</p>
      </div>

      <div>
        <p-code>formatDateTimeNumeric</p-code>
        <p>{{ formatDateTimeNumeric(date) }}</p>
      </div>

      <div>
        <p-code>formatTimeNumeric</p-code>
        <p>{{ formatTimeNumeric(date) }}</p>
      </div>

      <div>
        <p-code>formatDateTimeRelative (compared to now)</p-code>
        <p>{{ formatDateTimeRelative(date, now) }}</p>
      </div>
    </div>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { watch, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DateInput from '@/components/DateInput.vue'
  import TimezoneSelect from '@/components/TimezoneSelect.vue'
  import { startOfMinute, utcOffsetMinutes, selectedTimezone, formatDate, formatDateTimeNumeric, formatTimeNumeric, formatDateTimeRelative } from '@/utilities/dates'

  const date = ref(new Date())
  const now = ref(getCurrentTime())

  watch([date, selectedTimezone], () => {
    now.value = getCurrentTime()
  })

  function getCurrentTime(): string {
    return formatDate(startOfMinute(new Date()), 'yyyy-MM-dd HH:mm:ssXXX')
  }
</script>

<style>
.timezones-section { @apply
  flex
  flex-col
  gap-2
}
</style>