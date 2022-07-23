<template>
  <p-base-input class="json-input">
    <template v-for="(index, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template #control="{ attrs }">
      <textarea ref="inputArea" v-model="model" class="json-input__input-area" v-bind="attrs" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <pre><code ref="viewArea" multiline class="json-input__view-area" v-html="viewAreaInnerHtml" /></pre>
    </template>
  </p-base-input>
</template>

<script lang="ts" setup>
  import  { highlight, languages }  from 'prismjs'
  import JsonGrammar from 'prismjs/components/prism-json'
  import { computed, ref } from 'vue'
  languages.extend('json', JsonGrammar)

  const props = defineProps<{
    modelValue: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const inputArea = ref()
  const viewArea = ref()

  const viewAreaInnerHtml = computed(() => {
    return highlight(model.value, languages.json, 'json')
  })

  const model = computed({
    get() {
      return props.modelValue
    },
    set(val: string) {
      emit('update:modelValue', val)
    },
  })
</script>

<style>
.json-input {
  @apply
  relative
  block
  font-mono
  text-sm
}

.json-input__input-area {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;

  @apply
  block
  w-full
  h-full
  bg-transparent
  text-transparent
  caret-black
  p-0
  m-0
  whitespace-normal
  min-h-[150px]
}

.json-input__view-area {
  @apply
  absolute
  w-full
  h-full
  top-0
  left-0
  pointer-events-none
  p-0
  m-0
  whitespace-normal
}
</style>