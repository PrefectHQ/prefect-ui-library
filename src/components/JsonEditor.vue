<template>
  <div class="json-editor">
    <p-label label="Raw" :message="message" :state="state">
      <p-textarea v-model="model" class="json-editor__input" />
    </p-label>

    <p-label label="JSON">
      <div class="json-editor__output">
        <JsonView class="json-editor__output-content" :value="model" />
      </div>
    </p-label>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import JsonView from './JsonView.vue'
  import { useReactiveField } from '@/compositions'

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

  const { meta: state, errors: valueErrors } = useReactiveField<string>(model, 'rawModal', isValidJson)

  const message = computed(() => valueErrors.value[0] ?? '')

  function isValidJson(val: string): boolean | string {
    try {
      JSON.parse(val)
    } catch (error) {
      return (error as Error).message
    }

    return true
  }
</script>

<style>
.json-editor {
  @apply
  grid
  grid-cols-1
  grid-rows-2
  gap-2
}

@screen md {
  .json-editor {
    @apply
    grid-cols-2
    grid-rows-1
  }
}

.json-editor__input, .json-editor__output {
  @apply
  overscroll-x-none
}

.json-editor__input {
  @apply
  h-min
}

.json-editor__input > textarea {
  @apply
  min-h-[150px]
}

.json-editor__output {
  @apply
  relative
  h-full
}

.json-editor__output-content {
  @apply
  absolute
  right-0
  top-0
  w-full
  h-full
}
</style>