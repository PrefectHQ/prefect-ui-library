<template>
  <PLabel
    class="block-schema-property-input"
    :label="propertyTitle"
    :description="property.description"
    :message="errorMessage"
    :state="state"
    :class="classes"
    :style="styles"
  >
    <component :is="input" v-model="model" v-bind="{ ...attrs, ...inputProps, state }" />
  </PLabel>
</template>

<script lang="ts" setup>
  import { PLabel, PTagsArea, PNumberInput, PSelect, PTextInput, PToggle, useAttrsStylesAndClasses } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import BlockSchemaPropertyInputJson from './BlockSchemaPropertyInputJson.vue'
  import { useOptionalRules } from '@/compositions/useOptionalRules'
  import { useReactiveField } from '@/compositions/useReactiveField'
  import { BlockSchemaSimpleProperty } from '@/models/BlockSchema'
  import { isRequired, isValidJsonString, withMessage } from '@/services/validate'

  const props = defineProps<{
    property: BlockSchemaSimpleProperty,
    value: unknown,
    required?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:value', value: unknown): void,
  }>()

  const { classes, styles, attrs } = useAttrsStylesAndClasses()

  const model = computed({
    get(): unknown {
      return props.value
    },
    set(value: unknown): void {
      emit('update:value', value)
    },
  })


  const propertyTitle =computed(()=> props.required ? props.property.title : `${props.property.title} (Optional)`)

  const input = computed(() => {
    if (props.property.enum) {
      return PSelect
    }

    switch (props.property.type) {
      case 'string':
      case 'password':
        return PTextInput
      case 'number':
      case 'integer':
        return PNumberInput
      case 'boolean':
        return PToggle
      case 'array':
        return PTagsArea
      case 'object':
      default:
        return BlockSchemaPropertyInputJson
    }
  })

  const required = computed(() => props.required ?? false)
  const defaultRules = useOptionalRules(withMessage(isRequired, `${props.property.title} is required`), required)
  const jsonRules = [withMessage(isRequired, `${props.property.title} is required`), withMessage(isValidJsonString, 'Invalid JSON')]
  const rules = computed(() => input.value == BlockSchemaPropertyInputJson ? jsonRules : defaultRules)
  const { meta: state, errorMessage } = useReactiveField(model, props.property.title, rules.value)

  const inputProps = computed(() => {
    const value: Record<string, unknown> = {}

    if (props.property.type === 'array') {
      value.options = []
    }

    if (props.property.enum) {
      value.options = props.property.enum
    }

    if (props.property.type === 'array') {
      value.multiple = true
    }

    if (props.property.type === 'password') {
      value.type = 'password'
    }

    return value
  })
</script>