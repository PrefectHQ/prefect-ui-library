<template>
  <p-combobox v-model="internalValue" :options="options" :append="timestamp">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed, onUnmounted, ref } from 'vue'
  import { secondsInMinute, millisecondsInSecond, millisecondsInMinute } from '@/utilities/dates'
  import { formatDateInTimezone, utcTimezone } from '@/utilities/timezone'

  const props = defineProps<{
    modelValue: string | null,
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
  const timestamp = computed(() => formatDateInTimezone(currentTime.value, 'hh:mm a', props.modelValue))

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
  const options: SelectOption[] = [{ label: 'UTC', value: utcTimezone }, ...timezones]
</script>