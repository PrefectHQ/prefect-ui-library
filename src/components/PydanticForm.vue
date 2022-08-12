<template>
  <p-form @submit="submit">
    <SchemaFormFields :schema="pydanticSchema" />

    <template #footer>
      <p-button type="submit">
        Save
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormFields from '@/components/SchemaFormFields.vue'
  import { useReactiveForm } from '@/compositions'
  import { Schema } from '@/types/schemas'

  type PydanticFormValue = Record<string, unknown>
  const props = defineProps<{
    modelValue?: PydanticFormValue,
    pydanticSchema: Schema,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue' | 'submit', value?: PydanticFormValue): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })
  const { handleSubmit, values } = useReactiveForm(internalValue, { initialValues:  { ...props.modelValue }  })
  const submit = handleSubmit(() => emit('submit', values))
</script>
