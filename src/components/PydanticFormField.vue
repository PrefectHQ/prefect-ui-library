<template>
  <p-label :label="definition.title">
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
  import { computed, watch, ref } from 'vue'
  import type { TypeDefinition } from '@/types/Pydantic'
  import { getComponentFromTypeDefinition } from '@/utilities'

  const props = defineProps<{
    modelValue?: unknown,
    definition: TypeDefinition,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown): void,
  }>()

  const inputComponent = computed(() => {
    return getComponentFromTypeDefinition(props.definition)
  })

  const internalValue = ref(props.modelValue ?? props.definition.default ?? inputComponent.value?.defaultValue)

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