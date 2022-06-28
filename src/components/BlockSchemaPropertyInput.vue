<template>
  <PLabel
    class="block-schema-property-input"
    :label="property.title"
    :description="property.description"
    :message="errors.join('. ')"
    :state="state"
    :class="classes"
    :style="styles"
  >
    <component :is="input" v-model="model" v-bind="{ ...attrs, ...inputProps, state }" />
  </PLabel>
</template>

<script lang="ts" setup>
  import { PLabel, PCombobox, PNumberInput, PSelect, PTextInput, PToggle, useAttrsStylesAndClasses } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useReactiveField } from '@/compositions/useReactiveField'
  import { BlockSchemaSimpleProperty } from '@/models/BlockSchema'
  import { isRequired, withMessage } from '@/services/validate'

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

  const rules = computed(() => {
    if (props.required) {
      return [withMessage(isRequired, `${props.property.title} is required`)]
    }

    return []
  })

  const { meta: state, errors } = useReactiveField(model, props.property.title, rules)

  const input = computed(() => {
    if (props.property.enum) {
      return PSelect
    }

    switch (props.property.type) {
      case 'string':
        return PTextInput
      case 'number':
      case 'integer':
        return PNumberInput
      case 'boolean':
        return PToggle
      case 'array':
        return PCombobox
      default:
        return PTextInput
    }
  })

  const inputProps = computed(() => {
    const value: Record<string, unknown> = {}

    if (props.property.enum) {
      value.options = props.property.enum
    }

    if (props.property.type === 'array') {
      value.multiple = true
    }

    return value
  })
</script>