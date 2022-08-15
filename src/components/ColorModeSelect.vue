<template>
  <p-select v-model="internalValue" :options="options" class="color-scheme-select">
    <template #option="{ option }">
      <!-- eslint-disable-next-line vue/no-extra-parens -->
      <ColorModeSelectOption :mode="(option.value as ColorMode)" />
    </template>
    <template #default="{ selectedOption }">
      <!-- eslint-disable-next-line vue/no-extra-parens -->
      <ColorModeSelectOption :mode="(selectedOption.value as ColorMode)" />
    </template>
  </p-select>
</template>

<script lang="ts" setup>
  import { PSelect } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ColorModeSelectOption from './ColorModeSelectOption.vue'
  import { colorModes, ColorMode } from '@/types/ColorMode'

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