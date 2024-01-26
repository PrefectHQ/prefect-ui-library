<template>
  <div class="schema-form-property-any-of-input">
    <p-button-group v-model="selected" :options="options" small />
  </div>

  <p-card>
    <SchemaFormProperty v-model:value="value" :property="property" :required="required" />
  </p-card>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import SchemaFormProperty from '@/schemas/components/SchemaFormProperty.vue'
  import { useSchema } from '@/schemas/compositions/useSchema'
  import { SchemaProperty, isPropertyWith } from '@/schemas/types/schema'
  import { SchemaValue } from '@/schemas/types/schemaValues'
  import { getSchemaDefinition } from '@/schemas/utilities/definitions'
  import { Require } from '@/types/utilities'

  const props = defineProps<{
    property: Require<SchemaProperty, 'anyOf'>,
    value: SchemaValue,
    required: boolean,
  }>()

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  const value = computed({
    get() {
      return props.value
    },
    set(value) {
      emit('update:value', value)
    },
  })

  const schema = useSchema()
  const selected = ref(0)

  const property = computed(() => {
    const selectedProperty = props.property.anyOf[selected.value]

    if (isPropertyWith(selectedProperty, '$ref')) {
      return getSchemaDefinition(schema, selectedProperty.$ref)
    }

    return selectedProperty
  })

  const options = computed<ButtonGroupOption[]>(() => props.property.anyOf.map((property, index) => ({
    label: getLabelForProperty(property),
    value: index,
  })))

  function getLabelForProperty(property: SchemaProperty): string {
    if (property.$ref) {
      const definition = getSchemaDefinition(schema, property.$ref)

      return getLabelForProperty(definition)
    }

    return property.title ?? property.format ?? property.type ?? ''
  }
</script>