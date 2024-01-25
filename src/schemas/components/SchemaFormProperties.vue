<template>
  <div class="schema-form-properties">
    <template v-for="[key, property] in properties" :key="key">
      <SchemaFormProperty
        :value="getValue(key)"
        :property="property"
        :required="getRequired(key)"
        @update:value="setValue(key, $event)"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormProperty from '@/schemas/components/SchemaFormProperty.vue'
  import { SchemaProperty, SchemaProperties } from '@/schemas/types/schema'
  import { SchemaValues } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    parent: SchemaProperty,
    properties: SchemaProperties,
    values: SchemaValues,
  }>()

  const emit = defineEmits<{
    'update:values': [SchemaValues],
  }>()

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