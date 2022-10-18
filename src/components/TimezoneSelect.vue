<template>
  <p-combobox v-model="internalValue" :options="options" />
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { timezonesApi } from '@/services/TimezoneApi'

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

  const timezoneSubscription = useSubscription(timezonesApi.getTimezones, [])
  const timezones = computed(() => timezoneSubscription.response ?? {})
  const options = computed(() => Object.keys(timezones.value))
</script>