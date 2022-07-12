<template>
  <template v-if="hasSubProperties && level < 2">
    <template v-for="(subProperty, key) in property.properties" :key="key">
      <PydanticFormProperty :prop-key="`${propKey}.${key}`" :property="subProperty" :level="level + 1" />
    </template>
  </template>

  <template v-else>
    <h3
      v-if="!isUnionProperty && level == 0"
      class="pydantic-form-property__section-header"
    >
      <span>{{ property.title }}</span>
    </h3>

    <component :is="formComponent" :prop-key="propKey" :property="property" :level="level + 1" />
  </template>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PydanticFormAllOfProperty from './PydanticFormAllOfProperty.vue'
  import PydanticFormField from './PydanticFormField.vue'
  import PydanticFormUnionProperty from './PydanticFormUnionProperty.vue'
  import { hasAllOf, hasAnyOf, PydanticTypeProperty } from '@/types/Pydantic'

  const props = withDefaults(defineProps<{
    level?: number,
    propKey: string,
    property: PydanticTypeProperty,
  }>(), {
    level: 0,
    modelValue: () => ({}),
  })

  const isUnionProperty = computed(() => hasAnyOf(props.property))
  const isIntersectionProperty = computed(() => hasAllOf(props.property))
  const hasSubProperties = computed(() => !!props.property.properties)

  const formComponent = computed(() => {
    if (isUnionProperty.value) {
      return PydanticFormUnionProperty
    }

    if (isIntersectionProperty.value) {
      return PydanticFormAllOfProperty
    }

    return PydanticFormField
  })
</script>

<style>
.pydantic-form-property__section-header {
  @apply
  text-lg
  font-semibold
  flex
  gap-2
}
</style>