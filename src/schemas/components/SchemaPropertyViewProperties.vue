<template>
  <p-content class="schema-property-view-properties">
    <template v-for="[key, property] in displayProperties" :key="key">
      <template v-if="isPropertyWith(property, 'allOf')">
        <SchemaPropertyViewAllOf
          :value="getValue(key)"
          :property="getProperty(property, key)"
          :required="getRequired(key)"
        />
      </template>

      <template v-else-if="isPropertyWith(property, 'anyOf')">
        <SchemaPropertyViewAnyOf
          :value="getValue(key)"
          :property="getProperty(property, key)"
          :required="getRequired(key)"
        />
      </template>

      <template v-else>
        <SchemaPropertyView
          :value="getValue(key)"
          :property="getProperty(property, key)"
          :required="getRequired(key)"
        />
      </template>
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaPropertyView from '@/schemas/components/SchemaPropertyView.vue'
  import SchemaPropertyViewAllOf from '@/schemas/components/SchemaPropertyViewAllOf.vue'
  import SchemaPropertyViewAnyOf from '@/schemas/components/SchemaPropertyViewAnyOf.vue'
  import { SchemaProperty, SchemaProperties, isPropertyWith } from '@/schemas/types/schema'
  import { SchemaValues } from '@/schemas/types/schemaValues'
  import { titleCase } from '@/utilities/strings'

  const { parent, properties, values } = defineProps<{
    parent: SchemaProperty,
    properties: SchemaProperties,
    values: SchemaValues | undefined,
  }>()

  const displayProperties = computed(() => {
    return Object.entries(properties).sort((entryA, entryB) => {
      const [, propertyA] = entryA
      const [, propertyB] = entryB
      const { position: positionA = 0 } = propertyA
      const { position: positionB = 0 } = propertyB

      return positionA - positionB
    })
  })

  function getProperty<T extends SchemaProperty>(property: T, key: string): T {
    if (!property.title) {
      return { ...property, title: titleCase(key) }
    }

    return property
  }

  function getValue(propertyKey: string): unknown {
    return values?.[propertyKey]
  }

  function getRequired(propertyKey: string): boolean {
    return parent.required?.includes(propertyKey) ?? false
  }
</script>