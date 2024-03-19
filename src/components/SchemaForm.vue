<template>
  <p-form @submit="submit">
    <SchemaFormFields :schema="schema" />

    <template #footer>
      <p-button primary type="submit">
        Save
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormFields from '@/components/SchemaFormFields.vue'
  import { useReactiveForm } from '@/compositions'
  import { Schema, SchemaValues } from '@/types/schemas'

  const props = defineProps<{
    /**
     * @deprecated Use SchemaFormV2.vue
     */
    modelValue?: SchemaValues,
    schema: Schema,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue' | 'submit', value: SchemaValues): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? {}
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  const { handleSubmit } = useReactiveForm(internalValue, { initialValues: { ...props.modelValue } })
  const submit = handleSubmit(values => emit('submit', values))
</script>
