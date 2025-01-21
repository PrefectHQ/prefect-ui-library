<template>
  <p-combobox v-model="modelValue" :options="timezoneOptions" :append="timestamp" />
</template>

<script lang="ts" setup>
  import { SelectOptionGroup, SelectOption } from '@prefecthq/prefect-design'
  import { computed, onUnmounted, ref } from 'vue'
  import { secondsInMinute, millisecondsInSecond, millisecondsInMinute } from '@/utilities/dates'
  import { titleCase } from '@/utilities/strings'
  import { formatDateInTimezone, utcTimezone } from '@/utilities/timezone'

  const modelValue = defineModel<string | null>({ required: true })

  const props = defineProps<{
    showTimestamp?: boolean,
    hideUnset?: boolean,
  }>()

  const currentTime = ref(new Date())
  const timestamp = computed(() => props.showTimestamp ? formatDateInTimezone(currentTime.value, 'hh:mm a', modelValue.value) : undefined)

  function updateCurrentTime(): void {
    currentTime.value = new Date()
  }

  const secondsUntilNextMinute = secondsInMinute - currentTime.value.getSeconds()
  const millisecondsUntilNextMinute = millisecondsInSecond * secondsUntilNextMinute

  let timeout = setTimeout(() => {
    updateCurrentTime()
    timeout = setInterval(() => updateCurrentTime, millisecondsInMinute)
  }, millisecondsUntilNextMinute)

  onUnmounted(() => clearTimeout(timeout))

  function getTimezoneLabel(value: string): string {
    return titleCase(value).replaceAll('/', ' / ')
  }

  const timezones = Intl.supportedValuesOf('timeZone').map(timezone => ({ label: getTimezoneLabel(timezone), value: timezone }))
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const timezoneOptions = computed<SelectOptionGroup[]>(() => {
    const suggested: SelectOption[] = [
      { label: getTimezoneLabel(localTimezone), value: localTimezone },
      { label: 'UTC', value: utcTimezone },
    ]

    if (!props.hideUnset) {
      suggested.unshift({ label: 'Use browser default', value: null })
    }

    return [
      {
        label: 'Suggested timezones',
        options: suggested,
      },
      {
        label: 'All timezones',
        options: timezones,
      },
    ]
  })
</script>