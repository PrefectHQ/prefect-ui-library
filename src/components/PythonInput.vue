<template>
  <p-code-input v-model="internalValue" />
</template>

<script lang="ts" setup>
  /**
   * @deprecated use [p-code-input](https://main--prefect-design.netlify.app/components/code-input) instead
   */
  import { computed } from 'vue'

  const props = defineProps<{
    modelValue: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(val: string) {
      emit('update:modelValue', val)
    },
  })
</script>

<style>
.python-input {
  resize: inherit;
  z-index: 1;

  @apply
  relative
  block
  min-h-[100px]
  font-mono
  text-sm
  overflow-hidden
}

.python-input__input-area {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  resize: inherit;
  z-index: -1;

  @apply
  block
  absolute
  w-full
  h-full
  min-h-[inherit]
  bg-slate-800
  text-transparent
  caret-slate-50
  p-4
  m-0
  whitespace-nowrap
}

.python-input__view-area {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;

  @apply
  absolute
  w-full
  h-full
  min-h-[inherit]
  overflow-hidden
  top-0
  left-0
  p-4
  pointer-events-none
  z-0
}

.python-input__python-view {
  @apply
  !bg-transparent
  !p-0
}

.test-ear {
  @apply
  absolute
  top-2
  right-2
  bg-slate-900
  text-white
  z-10
}
</style>