<template>
  <div class="json-editor">
    <p-label label="Raw" :message="valueError" :state="rawValueState">
      <p-textarea ref="textarea" v-model="model" class="json-editor__input" />
    </p-label>

    <p-label label="JSON">
      <div class="json-editor__output">
        <JsonView class="json-editor__output-content" :value="model" />
      </div>
    </p-label>
  </div>
</template>

<script lang="ts" setup>
  import { useField } from 'vee-validate'
  import { computed, ref } from 'vue'
  import JsonView from './JsonView.vue'
  import { withMessage } from '@/services/validate'

  const props = defineProps<{
    modelValue: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()


  const getJsonError = (val: unknown): string | undefined => {
    try {
      JSON.parse(val as string)
    } catch (error) {
      return (error as Error).message
    }
  }

  function isValidJson(val: unknown): boolean {
    return !getJsonError(val)
  }

  const rules = {
    json: [withMessage(isValidJson, 'Error')],
  }

  const textarea = ref()
  const { value: rawModel, meta: rawValueState } = useField<string>('rawModel', rules.json)

  const valueError = computed(() => {
    return rawModel.value ? getJsonError(rawModel.value) : ''
  })

  const model = computed({
    get() {
      return props.modelValue
    },
    set(val: string) {
      emit('update:modelValue', val)
      rawModel.value = val
    },
  })
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

.json-editor__key {
  @apply
  text-rose-400
}

.json-editor__string-value {
  @apply
  text-emerald-400
}

.json-editor__number-value, .json-editor__bigint-value {
  @apply
  text-blue-400
}

.json-editor__boolean-value {
  @apply
  text-red-500
}

.json-editor__null-value, .json-editor__object-value {
  @apply
  text-slate-400
  italic
}
</style>