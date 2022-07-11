<template>
  <p-label :label="property.title ?? property.id" :message="errors?.[0]" :state="meta">
    <component
      :is="inputComponent.component"
      v-if="inputComponent"
      v-model="internalValue"
      v-bind="{ ...inputComponent.attrs }"
    >
      <template v-for="(content, key) in inputComponent?.slots" #[key]>
        {{ content }}
      </template>
    </component>

    <template v-else>
      <span class="pydantic-form-field__none">This parameter has a type 'None' and cannot be modified.</span>
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import { useField } from 'vee-validate'
  import { computed, watch } from 'vue'
  import type { PydanticTypeDefinition, PydanticTypeProperty } from '@/types/Pydantic'
  import { getComponentFromPydanticProperty } from '@/utilities'

  const props = defineProps<{
    modelValue?: unknown,
    property: PydanticTypeProperty,
    schema: PydanticTypeDefinition,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown): void,
  }>()

  const inputComponent = computed(() => {
    return getComponentFromPydanticProperty(props.property, props.schema)
  })

  const { value: internalValue, errors, meta } = useField(props.property.title ?? 'field', inputComponent.value?.validators, { initialValue: props.modelValue ?? props.property.default ?? inputComponent.value?.defaultValue })

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