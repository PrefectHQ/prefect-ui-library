<template>
  <div class="schema-form-property-input">
    <template v-if="isPrefectKindValue(value)">
      <SchemaFormKindInput :value="value" :property="property" @update:value="emit('update:value', $event)" />
    </template>
    <template v-else>
      <component :is="input.component" v-bind="input.props" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PNumberInput, PTextInput, PToggle } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormKindInput from '@/schemas/components/SchemaFormKindInput.vue'
  import SchemaFormProperties from '@/schemas/components/SchemaFormProperties.vue'
  import SchemaFormPropertyBlockDocument from '@/schemas/components/SchemaFormPropertyBlockDocument.vue'
  import { SchemaProperty, isPropertyWith, isSchemaPropertyType } from '@/schemas/types/schema'
  import { SchemaValue, asPrefectBlockDocumentValue, isPrefectKindValue } from '@/schemas/types/schemaValues'
  import { withProps } from '@/utilities/components'
  import { asType } from '@/utilities/types'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
  }>()

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  function update(value: unknown): void {
    emit('update:value', value)
  }

  const input = computed(() => {
    const { type } = props.property
    const { value } = props

    if (isPropertyWith(props.property, 'block_type_slug')) {
      return withProps(SchemaFormPropertyBlockDocument, {
        property: props.property,
        value: asPrefectBlockDocumentValue(value),
        'onUpdate:value': update,
      })
    }

    if (isSchemaPropertyType(type, 'boolean')) {
      return withProps(PToggle, {
        modelValue: asType(value, Boolean),
        'onUpdate:modelValue': update,
      })
    }

    if (isSchemaPropertyType(type, 'string')) {
      return withProps(PTextInput, {
        modelValue: asType(value, String),
        'onUpdate:modelValue': update,
      })
    }

    if (isSchemaPropertyType(type, 'integer') || isSchemaPropertyType(type, 'number')) {
      return withProps(PNumberInput, {
        modelValue: asType(value, Number),
        'onUpdate:modelValue': update,
      })
    }

    if (isSchemaPropertyType(type, 'array')) {
      // new list input from prefect-design
      throw 'not implemented'
    }

    if (isSchemaPropertyType(type, 'object')) {
      return withProps(SchemaFormProperties, {
        parent: props.property,
        properties: props.property.properties ?? {},
        values: asType(value, Object),
        'onUpdate:values': update,
      })
    }

    if (isSchemaPropertyType(type, 'null')) {
      return { component: null, props: {} }
    }

    if (isSchemaPropertyType(type, undefined)) {
      throw 'not implemented'
    }

    const exhaustive: never = type
    throw new Error(`SchemaFormPropertyInput missing case for ${exhaustive}`)
  })
</script>