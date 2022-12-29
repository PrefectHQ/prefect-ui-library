<template>
  <p-date-range-input
    v-model:startDate="adjustedStartDate"
    v-model:endDate="adjustedEndDate"
    v-model:viewingDate="adjustedViewingDate"
  >
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </p-date-range-input>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { assignTimezone, unassignTimezone } from '@/utilities/timezone'

  const props = defineProps<{
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
    viewingDate?: Date,
  }>()

  const emits = defineEmits<{
    (event: 'update:startDate' | 'update:endDate', value: Date | null): void,
    (event: 'update:viewingDate', value: Date | undefined): void,
  }>()

  const adjustedStartDate = computed({
    get() {
      return props.startDate ? assignTimezone(props.startDate) : null
    },
    set(value) {
      emits('update:startDate', value ? unassignTimezone(value) : null)
    },
  })

  const adjustedEndDate = computed({
    get() {
      return props.endDate ? assignTimezone(props.endDate) : null
    },
    set(value) {
      emits('update:endDate', value ? unassignTimezone(value) : null)
    },
  })

  const adjustedViewingDate = computed({
    get() {
      return props.viewingDate ? assignTimezone(props.viewingDate) : undefined
    },
    set(value) {
      emits('update:viewingDate', value ? unassignTimezone(value) : undefined)
    },
  })
</script>