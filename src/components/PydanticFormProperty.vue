<template>
  <component
    :is="formComponent"
    v-model="internalValue"
    :schema="propertyDefinition"
    :property="property"
    :level="level + 1"
  />
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PydanticForm from './PydanticForm.vue'
  import PydanticFormField from './PydanticFormField.vue'
  import PydanticFormIntersectionProperty from './PydanticFormIntersectionProperty.vue'
  import PydanticFormUnionProperty from './PydanticFormUnionProperty.vue'
  import { hasAnyOf, hasAllOf, PydanticTypeProperty, PydanticTypeDefinition, isPydanticType } from '@/types/Pydantic'

  const props = withDefaults(defineProps<{
    modelValue?: unknown,
    level?: number,
    property: PydanticTypeProperty,
    schema: PydanticTypeDefinition,
  }>(), {
    level: 0,
    modelValue: undefined,
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  const isUnionProperty = computed(() => hasAnyOf(props.property))
  const isIntersectionProperty = computed(() => hasAllOf(props.property))
  const isObjectProperty = computed(() => isPydanticType('object', props.property.type))

  const formComponent = computed(() => {
    if (isUnionProperty.value) {
      return PydanticFormUnionProperty
    }

    if (isIntersectionProperty.value) {
      return PydanticFormIntersectionProperty
    }

    if (isObjectProperty.value && props.level < 2) {
      return PydanticForm
    }

    return PydanticFormField
  })

  const propertyDefinition = computed(() => {
    if (isUnionProperty.value || isIntersectionProperty.value) {
      return props.schema
    }

    return props.property
  })
</script>