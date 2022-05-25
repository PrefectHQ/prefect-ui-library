<template>
  <p-label for="search" label="runSearch" class="runs-search--label" />
  <p-text-input v-model="internalValue" type="search" :placeholder="placeholderText" class="runs-search--input">
    <template #prepend>
      <p-icon icon="SearchIcon" class="runs-search--icon" />
    </template>
  </p-text-input>
</template>

<script lang="ts" setup>
  import { PTextInput, PIcon, PLabel } from '@prefecthq/prefect-design'
  import { debounce } from 'lodash'
  import { computed } from 'vue'

  const props = defineProps<{
    modelValue: string | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | null | undefined): void,
  }>()

  const debounceEmit = debounce((value: string | null | undefined) => {
    emits('update:modelValue', value)
  }, 500)


  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value: string | null | undefined) {
      debounceEmit(value)
    },
  })

  const placeholderText = 'Search by run name'
</script>

<style>
.runs-search--label {
  @apply sr-only
}

.runs-search--input {
  @apply w-auto
}

.runs-search--icon {
  @apply h-5 w-5 text-gray-500 ml-2
}
</style>
