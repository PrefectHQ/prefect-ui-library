<template>
  <p-code-input v-model="internalValue" lang="json" class="json-input">
    <template v-if="showFormatButton" #append>
      <p-button class="json-input__prettify-button" size="xs" @click="format">
        Format
      </p-button>
    </template>
  </p-code-input>
</template>

<script lang="ts" setup>
  /**
   * @deprecated use [p-code-input](https://main--prefect-design.netlify.app/components/code-input) instead
   * NOTE: the one thing this component has that p-code-input doesn't is the "format" button
   */
  import { computed } from 'vue'
  import { stringify } from '@/utilities/json'

  const props = defineProps<{
    modelValue: string | undefined,
    showFormatButton?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? ''
    },
    set(val: string) {
      emit('update:modelValue', val)
    },
  })

  const format = (): void => {
    try {
      internalValue.value = stringify(JSON.parse(internalValue.value))
    } catch {
      // do nothing
    }
  }
</script>

<style>
.json-input { @apply
  relative;
  resize: inherit;
}

.json-input__prettify-button { @apply
  absolute
  right-2
  top-2;
  z-index: 1;
}
</style>