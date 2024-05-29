<template>
  <keep-alive>
    <SchemaFormProperty
      :key="selectedPropertyIndexValue"
      :value="internalValue"
      :property="mergedProperty"
      :property-for-validation="property"
      :required
      :errors
      :skip-default-value-initialization
      class="schema-form-property-any-of-input"
      @update:value="updateValue"
      @vue:mounted="() => skipDefaultValueInitialization = true"
    >
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
  import { computed, onActivated, reactive, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import SchemaFormProperty from '@/schemas/components/SchemaFormProperty.vue'
  import { useSchemaFormSettings } from '@/schemas/compositions/useSchemaFormSettings'
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
  const { schema } = useSchemaFormSettings()
  const propertyValues = reactive<SchemaValue[]>([])
  const selectedPropertyIndexValue = ref<number>(0)
  const skipDefaultValueInitialization = ref(false)

  // we need to await this during setup so that the initial default value gets populated correctly
  // if we wait until mount when onActivated is called the child will override the value with its default value
  await setPropertyIndexForValue()
  propertyValues[selectedPropertyIndexValue.value] = props.value

  onActivated(() => {
    setPropertyIndexForValue()
    propertyValues[selectedPropertyIndexValue.value] = props.value
  })

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
      console.warn('SchemaFormPropertyAnyOf could not determine the initial index for property value')
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

  const mergedProperty = computed(() => {
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

  async function setPropertyIndexForValue(): Promise<void> {
    const index = await getInitialIndexForSchemaPropertyAnyOfValue({
      schema,
      property: props.property,
      value: props.value,
      api,
    })

    if (index === -1) {
      console.warn('SchemaFormPropertyAnyOf could not determine the initial index for property value')
      return
    }

    selectedPropertyIndexValue.value = index
  }
</script>