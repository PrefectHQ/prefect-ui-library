<template>
  <p-form @submit="submit">
    <SchemaFormFields v-model="internalValue" :schema="schema" />

    <template #footer>
      <slot name="footer">
        <p-button type="submit">
          Save
        </p-button>
      </slot>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useValidationObserver } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import SchemaFormFields from '@/components/SchemaFormFields.vue'
  import { Schema, SchemaValues } from '@/types/schemas'

  const props = defineProps<{
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

  const { validate } = useValidationObserver()

  const submit = async (): Promise<void> => {
    const valid = await validate()
    if (valid) {
      emit('submit', internalValue.value)
    }
  }
</script>
