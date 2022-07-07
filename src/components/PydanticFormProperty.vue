<template>
  <template v-if="hasSubProperties && level < 2">
    <template v-for="(subProperty, key) in properties" :key="key">
      <PydanticFormProperty :property="subProperty" :schema="schema" />
    </template>
  </template>

  <template v-else>
    <component
      :is="formComponent"
      v-model="internalValue"
      :schema="schema"
      :property="propertyDefinition"
      :level="level + 1"
    />
  </template>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PydanticFormField from './PydanticFormField.vue'
  import PydanticFormIntersectionProperty from './PydanticFormIntersectionProperty.vue'
  import PydanticFormUnionProperty from './PydanticFormUnionProperty.vue'
  import { hasAnyOf, hasAllOf, hasTypeRef, hasProperties, PydanticTypeProperty, PydanticTypeDefinition, isPydanticType, isPydanticTypeRef } from '@/types/Pydantic'
  import { getTypeDefinitionFromTypeRef } from '@/utilities/pydanticMapper'

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
  const hasSubProperties = computed(() => hasProperties(props.property))

  const formComponent = computed(() => {
    if (isUnionProperty.value) {
      return PydanticFormUnionProperty
    }

    if (isIntersectionProperty.value) {
      return PydanticFormIntersectionProperty
    }

    return PydanticFormField
  })

  const properties = computed(() => {
    return props.property.properties ?? []
  })

  const propertyDefinition = computed(() => {
    if (hasTypeRef(props.property)) {
      return getTypeDefinitionFromTypeRef(props.property.$ref, props.schema)
    }

    return props.property
  })
</script>