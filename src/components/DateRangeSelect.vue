<template>
  <p-date-range-select v-model="adjustedModelValue">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </p-date-range-select>
</template>

<script lang="ts" setup>
  import { DateRangeSelectValue } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { assignTimezone, unassignTimezone } from '@/utilities/timezone'

  const props = defineProps<{
    modelValue: DateRangeSelectValue,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: DateRangeSelectValue): void,
  }>()

  const adjustedModelValue = computed<DateRangeSelectValue>({
    get() {
      if (props.modelValue?.type === 'range') {
        return {
          type: 'range',
          startDate: assignTimezone(props.modelValue.startDate),
          endDate: assignTimezone(props.modelValue.endDate),
        }
      }

      return props.modelValue
    },
    set(value) {
      if (value?.type === 'range') {
        emit('update:modelValue', {
          type: 'range',
          startDate: unassignTimezone(value.startDate),
          endDate: unassignTimezone(value.endDate),
        })
        return
      }

      emit('update:modelValue', value)
    },
  })
</script>