<template>
  <p-base-input class="json-input">
    <template v-for="(index, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template #control="{ attrs }">
      <textarea v-model="model" spellcheck="false" class="json-input__input-area" v-bind="attrs" />
      <JsonView :value="model" class="json-input__view-area" v-bind="attrs" />
    </template>
  </p-base-input>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import JsonView from './JsonView.vue'

  const props = defineProps<{
    modelValue: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

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
  overflow-hidden
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
  bg-slate-700
  text-transparent
  caret-slate-50
  p-4
  m-0
  whitespace-normal
  min-h-[150px]
}

.json-input__view-area {
  @apply
  !bg-transparent
  absolute
  w-full
  h-full
  top-0
  left-0
  pointer-events-none
  whitespace-normal
}
</style>