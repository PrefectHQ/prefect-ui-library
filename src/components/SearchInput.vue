<template>
  <div class="search">
    <p-label for="search" :label="label" class="search--label" />
    <p-text-input v-model="internalValue" type="search" :placeholder="placeholder" class="runs-search--input">
      <template #prepend>
        <p-icon icon="SearchIcon" class="search--icon" />
      </template>
    </p-text-input>
  </div>
</template>

<script lang="ts" setup>
  import { PTextInput, PIcon, PLabel } from '@prefecthq/prefect-design'
  import { computed } from 'vue'

  const props = defineProps<{
    modelValue: string | null | undefined,
    placeholder?: string,
    label?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | null | undefined): void,
  }>()


  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value: string | null | undefined) {
      emits('update:modelValue', value)
    },
  })
</script>

<style>
.search--label {
  @apply sr-only
}

.search--input {
  @apply w-auto
}

.search--icon {
  @apply h-5 w-5 text-gray-500 ml-2
}
</style>
