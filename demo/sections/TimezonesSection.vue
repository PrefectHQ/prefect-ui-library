<template>
  <DemoSection heading="Timezone">
    <p-label label="Offset" class="mb-2">
      <p-number-input v-model="utcOffsetMinutes" />
    </p-label>

    <p-label label="Timezone" class="mb-2">
      <TimezoneSelect v-model="selectedTimezone" />
    </p-label>

    <div class="mb-2">
      <p-code>formatDate</p-code>
      <p>{{ formatDate(date) }}</p>
    </div>

    <div class="mb-2">
      <p-code>formatDateTimeNumeric</p-code>
      <p>{{ formatDateTimeNumeric(date) }}</p>
    </div>

    <div class="mb-2">
      <p-code>formatTimeNumeric</p-code>
      <p>{{ formatTimeNumeric(date) }}</p>
    </div>

    <div class="mb-2">
      <p-code>formatRelativeDateTime</p-code>
      <p>{{ formatDateTimeRelative(futureDate) }}</p>
      <p>{{ formatDateTimeRelative(pastDate) }}</p>
    </div>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { addHours, addMinutes } from 'date-fns'
  import { ref, watch } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import TimezoneSelect from '@/components/TimezoneSelect.vue'
  import { utcOffsetMinutes } from '@/compositions/useAdjustedDate'
  import { formatDate, formatDateTimeNumeric, formatTimeNumeric, formatDateTimeRelative } from '@/utilities/dates'

  const date = new Date()
  const futureDate = addMinutes(addHours(date, 5), 22)
  const pastDate = addMinutes(addHours(date, -5), -22)

  const selectedTimezone = ref<string | null>(null)

  watch(selectedTimezone, timezone => {
    console.log({ timezone })
    if (timezone === null) {
      return utcOffsetMinutes.value = null
    }

    // setUtcOffsetMinutes(timezone)
  })
</script>