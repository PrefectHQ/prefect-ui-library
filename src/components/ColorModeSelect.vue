<template>
  <p-select v-model="internalValue" :options="options" class="color-scheme-select">
    <template #option="{ option }">
      <ColorModeSelectOption :mode="option.value" />
    </template>
    <template #default="{ selectedOption }">
      <ColorModeSelectOption :mode="selectedOption.value" />
    </template>
  </p-select>
</template>

<script lang="ts" setup>
  import { PSelect } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ColorModeSelectOption from './ColorModeSelectOption.vue'
  import { colorModes } from '@/types/ColorMode'

  const props = defineProps<{
    selected: string | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const options = [...colorModes]

  const internalValue = computed({
    get() {
      return props.selected ?? null
    },
    set(value: string | null) {
      if (!value) {
        emits('update:selected', null)
      } else {
        emits('update:selected', value)
      }
    },
  })
</script>