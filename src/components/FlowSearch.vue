<template>
  <p-label for="search" label="fuzzySearch" class="fuzzy-search--label" />
  <p-text-input
    v-model="input"
    type="search"
    :placeholder="placeholderText"
    class="fuzzy-search--input"
  >
    <template #prepend>
      <p-icon icon="SearchIcon" class="fuzzy-search--icon" />
    </template>
  </p-text-input>
</template>

<script lang="ts" setup>
  import { PTextInput, PIcon, PLabel } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { Flow } from '@/models'


  const props = defineProps<{
    modelValue: Flow[],
    placeholderText?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Flow[] | null): void,
  }>()


  const input = computed({
    get() {
      return ''
    },
    set(val: string) {
      const filtered = props.modelValue.reduce<Flow[]>(
        (previous, current): Flow[]=> {
          if (current.name.toLowerCase().includes(val.toLowerCase())) {
            previous.push(current)
          }
          return previous
        }, [])
      const newValue = val.length ? filtered : null
      emits('update:modelValue', newValue)
    },
  })
</script>

<style>
.fuzzy-search--label {
  @apply sr-only;
}

.fuzzy-search--input {
  @apply w-auto;
}

.fuzzy-search--icon {
  @apply h-5 w-5 text-gray-500 ml-2;
}
</style>
