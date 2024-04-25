<template>
  <keep-alive>
    <SchemaFormProperty :key="selectedPropertyIndexValue" :value="internalValue" v-bind="{ property, required, errors }" class="schema-form-property-any-of-input" @update:value="updateValue">
      <template #default="{ kind }">
        <template v-if="kind === 'none'">
          <p-button-group v-model="selectedPropertyIndex" :options="options" small class="mb-2" />
        </template>
      </template>
    </SchemaFormProperty>
  </keep-alive>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import merge from 'lodash.merge'
  import { computed, reactive, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import SchemaFormProperty from '@/schemas/components/SchemaFormProperty.vue'
  import { useSchema } from '@/schemas/compositions/useSchema'
  import { SchemaProperty, isPropertyWith } from '@/schemas/types/schema'
  import { SchemaValue, isPrefectKindValue } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { getSchemaDefinition } from '@/schemas/utilities/definitions'
  import { getInitialIndexForSchemaPropertyAnyOfValue, getSchemaPropertyLabel } from '@/schemas/utilities/properties'
  import { Require } from '@/types/utilities'

  const props = defineProps<{
    property: Require<SchemaProperty, 'anyOf'>,
    value: SchemaValue,
    required: boolean,
    errors: SchemaValueError[],
  }>()

  const api = useWorkspaceApi()
  const schema = useSchema()
  const propertyValues = reactive<SchemaValue[]>([])

  const initialSelectedPropertyIndex = await getInitialIndexForSchemaPropertyAnyOfValue({
    schema,
    property: props.property,
    value: props.value,
    api,
  })

  // need to make sure we set the initial value for the selected property
  // reactivity is handled by the computed value
  // eslint-disable-next-line vue/no-setup-props-destructure
  propertyValues[initialSelectedPropertyIndex] = props.value

  if (initialSelectedPropertyIndex === -1) {
    throw 'not implemented'
  }

  const selectedPropertyIndexValue = ref(initialSelectedPropertyIndex)

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  const internalValue = computed(() => {
    if (isPrefectKindValue(props.value)) {
      return props.value
    }

    return propertyValues[selectedPropertyIndex.value]
  })

  async function updateValue(value: unknown): Promise<void> {
    if (isPrefectKindValue(value)) {
      emit('update:value', value)
      return
    }

    let index = await getInitialIndexForSchemaPropertyAnyOfValue({ value, property: props.property, api, schema })

    if (index === -1) {
      console.error('Could not determine property index')
      index = selectedPropertyIndex.value
    }

    propertyValues[index] = value
    selectedPropertyIndexValue.value = index

    emit('update:value', value)
  }

  const selectedPropertyIndex = computed({
    get() {
      return selectedPropertyIndexValue.value
    },
    set(index) {
      selectedPropertyIndexValue.value = index
      emit('update:value', propertyValues[index])
    },
  })

  const property = computed(() => {
    const selectedProperty = props.property.anyOf[selectedPropertyIndex.value]
    // eslint-disable-next-line no-unused-vars
    const { anyOf, ...property } = props.property

    if (isPropertyWith(selectedProperty, '$ref')) {
      return merge({}, getSchemaDefinition(schema, selectedProperty.$ref), property)
    }

    return merge({}, selectedProperty, property)
  })

  const options = computed<ButtonGroupOption[]>(() => props.property.anyOf.map((property, index) => ({
    label: getOptionLabelForProperty(property),
    value: index,
  })))

  function getOptionLabelForProperty(property: SchemaProperty): string {
    if (property.$ref) {
      const definition = getSchemaDefinition(schema, property.$ref)

      return getSchemaPropertyLabel(definition)
    }

    return getSchemaPropertyLabel(property)
  }
</script>