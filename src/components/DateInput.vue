<template>
  <p-date-input
    v-model="adjustedSelectedDate"
    :show-time="showTime"
    :min="adjustedMin"
    :max="adjustedMax"
  >
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </p-date-input>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { assignTimezone, unassignTimezone } from '@/utilities/timezone'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    showTime?: boolean,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const adjustedSelectedDate = computed({
    get() {
      return props.modelValue ? assignTimezone(props.modelValue) : null
    },
    set(value: Date | null) {
      emits('update:modelValue', value ? unassignTimezone(value) : null)
    },
  })

  const adjustedMin = computed(() => {
    return props.min ? assignTimezone(props.min) : null
  })

  const adjustedMax = computed(() => {
    return props.max ? assignTimezone(props.max) : null
  })
</script>