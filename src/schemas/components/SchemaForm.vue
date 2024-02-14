<template>
  <p-form class="schema-form" @submit="submit">
    <template v-if="schema.properties">
      <SchemaFormProperties v-model:values="values" :parent="schema" :properties="schema.properties" :errors="errors" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import debounce from 'lodash.debounce'
  import { provide, computed, ref, watch } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import SchemaFormProperties from '@/schemas/components/SchemaFormProperties.vue'
  import { schemaInjectionKey } from '@/schemas/compositions/useSchema'
  import { schemaFormKindsInjectionKey } from '@/schemas/compositions/useSchemaFormKinds'
  import { Schema } from '@/schemas/types/schema'
  import { PrefectKind, SchemaValues } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'

  const props = withDefaults(defineProps<{
    schema: Schema,
    values: SchemaValues,
    kinds: PrefectKind[],
    loading?: boolean | null,
  }>(), {
    loading: null,
  })

  provide(schemaInjectionKey, props.schema)
  provide(schemaFormKindsInjectionKey, props.kinds)

  const emit = defineEmits<{
    'update:values': [SchemaValues],
    'update:loading': [boolean],
    'submit': [SchemaValues],
  }>()

  const api = useWorkspaceApi()
  const errors = ref<SchemaValueError[]>([])

  const values = computed({
    get() {
      return props.values
    },
    set(values) {
      emit('update:values', values)
    },
  })

  watch(values, () => {
    // if there are no errors we can wait until the user clicks submit
    if (!errors.value.length) {
      return
    }

    validateDebounced()
  }, { deep: true })

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
      const valid = await validate()

      if (!valid) {
        return
      }
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }

    emit('submit', values.value)
  }

  async function validate(): Promise<boolean> {
    const { valid, errors: errorsResponse } = await api.schemas.validate(props.schema, values.value)

    errors.value = errorsResponse

    return valid
  }

  const validateDebounced = debounce(validate, 1_000)
</script>