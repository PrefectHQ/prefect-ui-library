<template>
  <div class="search">
    <template v-if="label">
      <p-label for="search" :label="label" class="search__label" />
    </template>
    <p-text-input v-model="internalValue" type="search" :placeholder="placeholder" class="search__input">
      <template #prepend>
        <p-icon icon="SearchIcon" class="search__icon" />
      </template>
    </p-text-input>
  </div>
</template>

<script lang="ts" setup>
  import { PTextInput, PIcon, PLabel } from '@prefecthq/prefect-design'
  import { computed, withDefaults } from 'vue'

  const props = withDefaults(defineProps<{
    modelValue: string | null | undefined,
    placeholder?: string,
    label?: string,
  }>(), {
    placeholder: 'Search...',
    label: undefined,
  })

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
.search__label { @apply
  sr-only
}

.search__icon { @apply
  text-foreground-400
  ml-2
}
</style>
