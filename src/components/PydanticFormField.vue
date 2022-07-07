<template>
  <p-label :label="schema.title" :message="errors?.[0]" :state="meta">
    <component
      :is="inputComponent.component"
      v-if="inputComponent"
      v-model="internalValue"
      v-bind="{ ...inputComponent.attrs }"
    />
    <template v-else>
      <span class="pydantic-form-field__none">This parameter has a type 'None' and cannot be modified.</span>
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import { useField } from 'vee-validate'
  import { computed, watch } from 'vue'
  import type { PydanticTypeDefinition } from '@/types/Pydantic'
  import { getComponentFromPydanticTypeDefinition } from '@/utilities'

  const props = defineProps<{
    modelValue?: unknown,
    schema: PydanticTypeDefinition,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown): void,
  }>()

  const inputComponent = computed(() => {
    return getComponentFromPydanticTypeDefinition(props.schema)
  })

  const { value: internalValue, errors, meta } = useField(props.schema.title ?? 'field', inputComponent.value?.validators, { initialValue: props.modelValue ?? props.schema.default ?? inputComponent.value?.defaultValue })

  const value = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  watch(() => internalValue.value, () => {
    value.value = internalValue.value
  })
</script>

<style>
.pydantic-form-field__none {
  @apply
  text-slate-500
}
</style>