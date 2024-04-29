<template>
  <p-form class="schema-form" novalidate @submit="submit">
    <p-content>
      <slot :kind :set-kind />

      <template v-if="schema.properties">
        <SchemaInput v-model:values="values" :schema="schema" :errors="errors" :kinds="kinds" />
      </template>

      <p-checkbox v-model="shouldValidate" label="Validate parameters before submitting" />
    </p-content>
  </p-form>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed, ref, h } from 'vue'
  import ToastParameterValidationError from '@/components/ToastParameterValidationError.vue'
  import SchemaInput from '@/schemas/components/SchemaInput.vue'
  import { usePrefectKindValue } from '@/schemas/compositions/usePrefectKindValue'
  import { useSchemaValidation } from '@/schemas/compositions/useSchemaValidation'
  import { Schema } from '@/schemas/types/schema'
  import { PrefectKind, SchemaValues, getPrefectKindFromValue } from '@/schemas/types/schemaValues'

  const props = withDefaults(defineProps<{
    schema: Schema,
    values: SchemaValues,
    kinds: PrefectKind[],
    loading?: boolean | null,
  }>(), {
    loading: null,
  })

  const emit = defineEmits<{
    'update:values': [SchemaValues],
    'update:loading': [boolean],
    'submit': [SchemaValues],
  }>()

  const shouldValidate = ref(true)

  const values = computed({
    get() {
      return props.values
    },
    set(values) {
      emit('update:values', values)
    },
  })

  const kind = computed(() => getPrefectKindFromValue(() => props.values))
  const { errors: formErrors, validate } = useSchemaValidation(() => props.schema, values)
  const { errors: propertyErrors, setKind } = usePrefectKindValue({
    value: values,
    property: () => props.schema,
  })

  const errors = computed(() => propertyErrors.value.length ? propertyErrors.value : formErrors.value)

  const loadingFallback = ref(false)
  const loading = computed({
    get() {
      return props.loading ?? loadingFallback.value
    },
    set(value) {
      loadingFallback.value = value
      emit('update:loading', value)
    },
  })

  async function submit(): Promise<void> {
    loading.value = true

    try {
      if (shouldValidate.value) {

        const valid = await validate()

        if (!valid) {
          return
        }

      }

    } catch (error) {
      console.error(error)

      showToast(h(ToastParameterValidationError), 'error')
      return
    } finally {
      loading.value = false
    }

    emit('submit', values.value)
  }
</script>