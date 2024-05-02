<template>
  <div class="duration-input">
    <p-number-input v-model="quantity" v-bind="$attrs" :min />
    <label class="sr-only" for="duration-input-unit">Duration unit</label>
    <p-select id="duration-input-unit" v-model="unit" :options="units" />
  </div>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { secondsInDay, secondsInHour, secondsInMinute } from 'date-fns/constants'
  import { computed, ref, watch } from 'vue'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    modelValue: number,
    min?: number,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: number): void,
  }>()

  const unit = ref<number>(getDefaultUnitForValue(props.modelValue))
  const units = computed<SelectOption[]>(() => {
    const min = props.min ?? 0

    const options = [
      { label: 'Seconds', value: 1 },
      { label: 'Minutes', value: secondsInMinute },
      { label: 'Hours', value: secondsInHour },
      { label: 'Days', value: secondsInDay },
    ]

    return options.filter(option => option.value >= min)
  })

  watch(unit, (newUnit, oldUnit) => {
    emit('update:modelValue', props.modelValue / oldUnit * newUnit)
  })

  const quantity = computed({
    get() {
      return props.modelValue / unit.value
    },
    set(value) {
      emit('update:modelValue', value * unit.value)
    },
  })

  function getDefaultUnitForValue(value: number): number {
    if (value % secondsInDay === 0) {
      return secondsInDay
    }

    if (value % secondsInHour === 0) {
      return secondsInHour
    }

    if (value % secondsInMinute === 0) {
      return secondsInMinute
    }

    return 1
  }
</script>

<style>
.duration-input { @apply
  w-full
  grid
  gap-2;
  grid-template-columns: 1fr 7rem;
}
</style>