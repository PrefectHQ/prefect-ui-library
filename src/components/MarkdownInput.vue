<template>
  <p-base-input class="markdown-input">
    <template v-for="(index, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template #control="{ attrs }">
      <textarea
        ref="source"
        v-model="internalValue"
        spellcheck="false"
        class="markdown-input__input-area"
        v-bind="attrs"
      />
      <div ref="target" class="markdown-input__view-area">
        <MarkdownPreview :value="internalValue" class="markdown-input__markdown-view" v-bind="attrs" />
        <!-- This is an important space to scroll link the preview and input elements -->
        &nbsp;
      </div>
    </template>
  </p-base-input>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import MarkdownPreview from './MarkdownPreview.vue'
  import { useScrollLinking } from '@/compositions'

  const props = defineProps<{
    modelValue: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const { source, target } = useScrollLinking()

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
.markdown-input {
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

.markdown-input__input-area {
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
  text-transparent
  m-0
  p-4
  caret-slate-900
  whitespace-nowrap
}

.markdown-input__view-area {
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
  pointer-events-none
  z-0
}

.markdown-input__view-area  { @apply
  p-4
}
</style>