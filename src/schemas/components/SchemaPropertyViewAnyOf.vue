<template>
  <keep-alive>
    <SchemaPropertyView
      :key="selectedPropertyIndexValue"
      :value="internalValue"
      :property="mergedProperty"
      :required
      class="schema-property-view-any-of"
    >
      <template #default="{ kind }">
        <template v-if="kind === 'none'">
          <p-button-group v-model="selectedPropertyIndex" :options="options" small class="mb-2" />
        </template>
      </template>
    </SchemaPropertyView>
  </keep-alive>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import merge from 'lodash.merge'
  import { computed, reactive, ref } from 'vue'
  import SchemaPropertyView from '@/schemas/components/SchemaPropertyView.vue'
  import { useSchemaFormSettings } from '@/schemas/compositions/useSchemaFormSettings'
  import { SchemaProperty, isPropertyWith } from '@/schemas/types/schema'
  import { SchemaValue, isPrefectKindValue } from '@/schemas/types/schemaValues'
  import { getSchemaDefinition } from '@/schemas/utilities/definitions'
  import { getSchemaPropertyLabel } from '@/schemas/utilities/properties'
  import { Require } from '@/types/utilities'

  const props = defineProps<{
    property: Require<SchemaProperty, 'anyOf'>,
    value: SchemaValue,
    required: boolean,
  }>()

  const { schema } = useSchemaFormSettings()
  const propertyValues = reactive<SchemaValue[]>([])
  const selectedPropertyIndexValue = ref<number>(0)

  const internalValue = computed(() => {
    if (isPrefectKindValue(props.value)) {
      return props.value
    }

    return propertyValues[selectedPropertyIndex.value]
  })

  const selectedPropertyIndex = computed({
    get() {
      return selectedPropertyIndexValue.value
    },
    set(index) {
      selectedPropertyIndexValue.value = index
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
</script>