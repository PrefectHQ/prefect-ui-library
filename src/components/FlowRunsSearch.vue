<template>
  <p-label for="search" label="flowRunSearch" class="flow-runs-search--label" />
  <p-text-input v-model="internalValue" type="search" placeholder="Search" class="flow-runs-search--input">
    <template #prepend>
      <span>
        <p-icon icon="SearchIcon" />
      </span>
    </template>
  </p-text-input>
</template>

<script lang="ts" setup>
  import { PTextInput } from '@prefecthq/prefect-design'
  import { computed } from 'vue'


  const props = defineProps<{
    modelValue: string,
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
.flow-runs-search--label {
  @apply sr-only
}

.flow-runs-search--input {
  @apply w-auto
}
</style>
