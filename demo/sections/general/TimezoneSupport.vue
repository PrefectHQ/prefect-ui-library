<template>
  <ComponentPage title="CopyOverflowMenuItem">
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
        <p>{{ formatDateTimeRelative(date, currentTime) }}</p>
        <div>{{ formatDateTimeNumeric(date) }}</div>
        <div>{{ formatDateTimeNumeric(currentTime) }}</div>
      </div>
    </div>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { watch, ref } from 'vue'
  import DateInput from '@/components/DateInput.vue'
  import TimezoneSelect from '@/components/TimezoneSelect.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { formatDate, formatDateTimeNumeric, formatTimeNumeric, formatDateTimeRelative } from '@/utilities/dates'
  import { now, selectedTimezone, utcOffsetMinutes } from '@/utilities/timezone'

  const date = ref(new Date())
  const currentTime = ref(now())

  watch([date, selectedTimezone], () => {
    currentTime.value = now()
  })
</script>

<style>
.timezones-section { @apply
  flex
  flex-col
  gap-2
}
</style>