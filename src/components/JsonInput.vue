<template>
  <p-code-input v-model="json" lang="json" class="json-input" v-bind="{ showLineNumbers, minLines }">
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
  import { ref, watch } from 'vue'
  import { stringify } from '@/utilities/json'
  import { removeWhitespace } from '@/utilities/strings'

  const props = defineProps<{
    minLines?: number,
    modelValue: string | undefined,
    showFormatButton?: boolean,
    showLineNumbers?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const json = ref<string>(props.modelValue ?? '')

  watch(() => props.modelValue, value => {
    if (!matches(value, json.value)) {
      json.value = value ?? ''
    }
  })

  watch(json, value => {
    if (!matches(value, props.modelValue)) {
      emit('update:modelValue', value)
    }
  })

  function matches(valueA: string | undefined, valueB: string | undefined): boolean {
    return removeWhitespace(valueA ?? '') === removeWhitespace(valueB ?? '')
  }

  const format = (): void => {
    try {
      json.value = stringify(JSON.parse(json.value))
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