<template>
  <p-base-input class="json-input">
    <template v-for="(index, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template #control="{ attrs }">
      <textarea
        ref="inputArea"
        v-model="internalValue"
        spellcheck="false"
        class="json-input__input-area"
        v-bind="attrs"
        @scroll="handleScroll"
      />
      <div ref="viewArea" class="json-input__view-area">
        <JsonView :value="internalValue" class="json-input__json-view" v-bind="attrs" />
      </div>

      <p-button v-if="showFormatButton" class="json-input__prettify-button" size="xs" @click="format">
        Format
      </p-button>
    </template>
  </p-base-input>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import JsonView from './JsonView.vue'

  const props = defineProps<{
    modelValue: string | undefined,
    showFormatButton?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const inputArea = ref<HTMLTextAreaElement>()
  const viewArea = ref<HTMLDivElement>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? ''
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

  const format = (): void => {
    try {
      internalValue.value = JSON.stringify(JSON.parse(internalValue.value), undefined, 2)
    } catch {
      // do nothing
    }
  }
</script>

<style>
.json-input {
  resize: inherit;
  z-index: 1;

  @apply
  relative
  flex
  items-start
  justify-end
  min-h-[100px]
  font-mono
  text-sm
  overflow-hidden
  pt-1.5
}

.json-input__input-area {
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
  bg-slate-700
  text-transparent
  caret-slate-50
  p-4
  m-0
  whitespace-nowrap
  top-0
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
  z-0
}

.json-input__json-view {
  @apply
  !bg-transparent
  !p-0
}

.json-input__prettify-button {
  @apply
  absolute
  right-2
  top-2
}
</style>