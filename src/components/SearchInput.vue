<template>
  <div class="search">
    <template v-if="label">
      <p-label :for="inputId" :label="label" class="search__label" />
    </template>

    <p-text-input
      :id="inputId"
      v-model="internalValue"
      type="search"
      :small="size === 'small'"
      :placeholder
      class="search__input"
    >
      <template #prepend>
        <p-icon icon="MagnifyingGlassIcon" class="search__icon" />
      </template>
    </p-text-input>
  </div>
</template>

<script lang="ts" setup>
  import { PTextInput, PIcon, PLabel, randomId } from '@prefecthq/prefect-design'
  import { computed } from 'vue'

  const props = withDefaults(defineProps<{
    modelValue: string | null | undefined,
    placeholder?: string,
    label?: string,
    size?: 'small' | 'default',
  }>(), {
    placeholder: 'Search...',
    label: undefined,
    size: 'default',
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

  const inputId = `search-${randomId()}`
</script>

<style>
.search__label { @apply
  sr-only
}

.search__icon { @apply
  ml-2;
  color: var(--p-color-input-placeholder);
}
</style>
