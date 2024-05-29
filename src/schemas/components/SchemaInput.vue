<template>
  <p-content class="schema-input">
    <slot :kind :set-kind />

    <component :is="input.component" v-bind="input.props" />
  </p-content>
</template>

<script lang="ts" setup>
  import { VNode, computed, provide } from 'vue'
  import { usePrefectKindValue } from '@/schemas/compositions/usePrefectKindValue'
  import { schemaFormSettingsInjectionKey } from '@/schemas/compositions/useSchemaFormSettings'
  import { useSchemaPropertyInput } from '@/schemas/compositions/useSchemaPropertyInput'
  import { Schema } from '@/schemas/types/schema'
  import { PrefectKind, SchemaValues, getPrefectKindFromValue } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'

  const props = defineProps<{
    schema: Schema,
    values: SchemaValues | undefined,
    errors: SchemaValueError[],
    kinds: PrefectKind[],

    /**
     * If `true` will not initialize the values by populating default values from the supplied schema
     */
    skipDefaultValueInitialization?: boolean,
  }>()

  provide(schemaFormSettingsInjectionKey, {
    schema: props.schema,
    kinds: props.kinds,
    skipDefaultValueInitialization: props.skipDefaultValueInitialization,
  })

  const emit = defineEmits<{
    'update:values': [SchemaValues | undefined],
  }>()

  defineSlots<{
    default: (props: { kind: PrefectKind, setKind: (to: PrefectKind) => void }) => VNode,
  }>()

  const values = computed({
    get() {
      return props.values
    },
    set(values) {
      emit('update:values', values)
    },
  })

  const kind = computed(() => getPrefectKindFromValue(() => props.values))

  const { errors: propertyErrors, setKind } = usePrefectKindValue({
    value: values,
    property: () => props.schema,
  })

  const { input } = useSchemaPropertyInput(() => props.schema, values, getErrors)

  function getErrors(): SchemaValueError[] {
    if (propertyErrors.value.length) {
      return propertyErrors.value
    }

    return props.errors
  }
</script>