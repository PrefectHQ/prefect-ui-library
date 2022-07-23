<template>
  <p-base-input class="json-input">
    <template v-for="(index, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template #control="{ attrs }">
      <textarea
        ref="inputArea"
        v-model="model"
        spellcheck="false"
        class="json-input__input-area"
        v-bind="attrs"
        @scroll="handleScroll"
      />
      <div ref="viewArea" class="json-input__view-area">
        <JsonView :value="model" class="json-input__json-view" v-bind="attrs" />
      </div>
    </template>
  </p-base-input>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import JsonView from './JsonView.vue'

  const props = defineProps<{
    modelValue: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const inputArea = ref<HTMLTextAreaElement>()
  const viewArea = ref<HTMLDivElement>()

  const model = computed({
    get() {
      return props.modelValue
    },
    set(val: string) {
      emit('update:modelValue', val)
    },
  })

  // This produces a scroll-linking effect
  const handleScroll = (): void => {
    if (!inputArea.value || !viewArea.value) {
      return
    }

    viewArea.value.scrollTop = inputArea.value.scrollTop
    viewArea.value.scrollLeft = inputArea.value.scrollLeft
  }
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
  whitespace-nowrap
}

.json-input__view-area {
  @apply
  absolute
  w-full
  h-full
  overflow-hidden
  top-0
  left-0
  p-4
  pointer-events-none
}

.json-input__json-view {
  @apply
  !bg-transparent
  !p-0
}
</style>