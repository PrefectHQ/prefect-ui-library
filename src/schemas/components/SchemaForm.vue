<template>
  <p-form class="schema-form" novalidate @submit="submit">
    <template v-if="schema.properties">
      <SchemaFormProperties v-model:values="values" :parent="schema" :properties="schema.properties" :errors="errors" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { provide, computed, ref } from 'vue'
  import SchemaFormProperties from '@/schemas/components/SchemaFormProperties.vue'
  import { schemaInjectionKey } from '@/schemas/compositions/useSchema'
  import { schemaFormKindsInjectionKey } from '@/schemas/compositions/useSchemaFormKinds'
  import { useSchemaValidation } from '@/schemas/compositions/useSchemaValidation'
  import { Schema } from '@/schemas/types/schema'
  import { PrefectKind, SchemaValues } from '@/schemas/types/schemaValues'

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

  const values = computed({
    get() {
      return props.values
    },
    set(values) {
      emit('update:values', values)
    },
  })

  const { errors, validate } = useSchemaValidation(() => props.schema, values)

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
</script>