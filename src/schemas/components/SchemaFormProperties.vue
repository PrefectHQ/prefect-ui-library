<template>
  <div class="schema-form-properties">
    <template v-for="[key, property] in properties" :key="key">
      <template v-if="isPropertyWith(property, '$ref')">
        <SchemaFormProperty
          :value="getValue(key)"
          :property="getSchemaDefinition(schema, property.$ref)"
          :required="getRequired(key)"
          @update:value="setValue(key, $event)"
        />
      </template>

      <template v-else-if="isPropertyWith(property, 'allOf')">
        <SchemaFormPropertyAllOfInput
          :value="getValue(key)"
          :property="property"
          :required="getRequired(key)"
          @update:value="setValue(key, $event)"
        />
      </template>

      <template v-else-if="isPropertyWith(property, 'anyOf')">
        <SchemaFormPropertyAnyOfInput
          :value="getValue(key)"
          :property="property"
          :required="getRequired(key)"
          @update:value="setValue(key, $event)"
        />
      </template>

      <template v-else>
        <SchemaFormProperty
          :value="getValue(key)"
          :property="property"
          :required="getRequired(key)"
          @update:value="setValue(key, $event)"
        />
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormProperty from '@/schemas/components/SchemaFormProperty.vue'
  import SchemaFormPropertyAllOfInput from '@/schemas/components/SchemaFormPropertyAllOfInput.vue'
  import SchemaFormPropertyAnyOfInput from '@/schemas/components/SchemaFormPropertyAnyOfInput.vue'
  import { useSchema } from '@/schemas/compositions/useSchema'
  import { SchemaProperty, SchemaProperties, isPropertyWith } from '@/schemas/types/schema'
  import { SchemaValues } from '@/schemas/types/schemaValues'
  import { getSchemaDefinition } from '@/schemas/utilities/definitions'

  const props = defineProps<{
    parent: SchemaProperty,
    properties: SchemaProperties,
    values: SchemaValues,
  }>()

  const emit = defineEmits<{
    'update:values': [SchemaValues],
  }>()

  const schema = useSchema()

  const properties = computed(() => {
    return Object.entries(props.properties).sort((entryA, entryB) => {
      const [, propertyA] = entryA
      const [, propertyB] = entryB
      const { position: positionA = 0 } = propertyA
      const { position: positionB = 0 } = propertyB

      return positionA - positionB
    })
  })

  function getValue(propertyKey: string): unknown {
    return props.values[propertyKey] ?? null
  }

  function setValue(propertyKey: string, value: unknown): void {
    emit('update:values', {
      ...props.values,
      [propertyKey]: value,
    })
  }

  function getRequired(propertyKey: string): boolean {
    return props.parent.required?.includes(propertyKey) ?? false
  }
</script>