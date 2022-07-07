<template>
  <template v-if="hasSubProperties && level < 2">
    <template v-for="(subProperty, key) in properties" :key="key">
      <PydanticFormProperty :property="subProperty" :schema="schema" :level="level + 1" />
    </template>
  </template>

  <template v-else>
    <h3 v-if="!isUnionProperty && propertyDefinition && level == 0" class="pydantic-form-union-property__section-header">
      <span>{{ propertyDefinition.id }}</span>
    </h3>

    <component
      :is="formComponent"
      v-model="internalValue"
      :schema="schema"
      :property="property"
      :level="level + 1"
    />
  </template>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PydanticFormField from './PydanticFormField.vue'
  import PydanticFormIntersectionProperty from './PydanticFormIntersectionProperty.vue'
  import PydanticFormUnionProperty from './PydanticFormUnionProperty.vue'
  import { hasAnyOf, hasAllOf, hasTypeRef, hasProperties, PydanticTypeProperty, PydanticTypeDefinition } from '@/types/Pydantic'
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
    // if (hasTypeRef(props.property)) {
    //   console.log(props.property, props.schema)
    //   return getTypeDefinitionFromTypeRef(props.property.$ref, props.schema)
    // }

    return props.property
  })
</script>