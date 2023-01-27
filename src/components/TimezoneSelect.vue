<template>
  <p-combobox v-model="internalValue" :options="timezoneOptions" :append="timestamp">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { SelectOptionGroup, SelectOption } from '@prefecthq/prefect-design'
  import { computed, onUnmounted, ref } from 'vue'
  import { secondsInMinute, millisecondsInSecond, millisecondsInMinute } from '@/utilities/dates'
  import { formatDateInTimezone, utcTimezone } from '@/utilities/timezone'

  const props = defineProps<{
    modelValue: string | null,
    showTimestamp?: boolean,
    hideUnset?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? 'UTC'
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  const currentTime = ref(new Date())
  const timestamp = computed(() => props.showTimestamp ? formatDateInTimezone(currentTime.value, 'hh:mm a', props.modelValue) : undefined)

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


  const timezones = Intl.supportedValuesOf('timeZone').map(timezone => ({ label: timezone, value: timezone }))
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const timezoneOptions = computed<SelectOptionGroup[]>(() => {
    const suggested: SelectOption[] = [
      { label: localTimezone, value: localTimezone },
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