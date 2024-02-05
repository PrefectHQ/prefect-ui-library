<template>
  <p-content class="schema-form-properties">
    <template v-for="[key, property] in properties" :key="key">
      <template v-if="isPropertyWith(property, 'allOf')">
        <SchemaFormPropertyAllOf
          :value="getValue(key)"
          :property="property"
          :required="getRequired(key)"
          @update:value="setValue(key, $event)"
        />
      </template>

      <template v-else-if="isPropertyWith(property, 'anyOf')">
        <SchemaFormPropertyAnyOf
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
  </p-content>
</template>

<script lang="ts" setup>
  import { isDefined } from '@prefecthq/prefect-design'
  import debounce from 'lodash.debounce'
  import { computed } from 'vue'
  import SchemaFormProperty from '@/schemas/components/SchemaFormProperty.vue'
  import SchemaFormPropertyAllOf from '@/schemas/components/SchemaFormPropertyAllOf.vue'
  import SchemaFormPropertyAnyOf from '@/schemas/components/SchemaFormPropertyAnyOf.vue'
  import { SchemaProperty, SchemaProperties, isPropertyWith } from '@/schemas/types/schema'
  import { SchemaValues } from '@/schemas/types/schemaValues'
  import { SchemaValue } from '@/types'

  const props = defineProps<{
    parent: SchemaProperty,
    properties: SchemaProperties,
    values: SchemaValues | undefined,
  }>()

  const emit = defineEmits<{
    'update:values': [SchemaValues | undefined],
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
    return props.values?.[propertyKey] ?? undefined
  }

  function setValue(propertyKey: string, value: unknown): void {
    patches.push({ propertyKey, value })

    flush()
  }

  function getRequired(propertyKey: string): boolean {
    return props.parent.required?.includes(propertyKey) ?? false
  }

  const patches: { propertyKey: string, value: SchemaValue }[] = []

  const flush = debounce(() => {
    const updatedValues = { ...props.values }

    patches.forEach(({ propertyKey, value }) => {
      updatedValues[propertyKey] = value

      if (!isDefined(value)) {
        delete updatedValues[propertyKey]
      }
    })

    patches.slice(0)

    emit('update:values', updatedValues)
  }, 10)
</script>