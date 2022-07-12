<template>
  <template v-if="hasSubProperties && level < 2">
    <template v-for="(subProperty, key) in property.properties" :key="key">
      <PydanticFormProperty :prop-key="key" :property="subProperty" :level="level + 1" />
    </template>
  </template>

  <template v-else>
    <h3
      v-if="!isUnionProperty && level == 0"
      class="pydantic-form-property__section-header"
    >
      <span>{{ property.title }}</span>
    </h3>

    <component :is="formComponent" v-model="internalValue" :prop-key="propKey" :property="property" :level="level + 1" />
  </template>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PydanticFormField from './PydanticFormField.vue'
  import PydanticFormUnionProperty from './PydanticFormUnionProperty.vue'
  import { hasAnyOf, PydanticTypeProperty } from '@/types/Pydantic'

  const props = withDefaults(defineProps<{
    modelValue?: Record<string, unknown>,
    level?: number,
    propKey: string,
    property: PydanticTypeProperty,
  }>(), {
    level: 0,
    modelValue: () => ({}),
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
  const hasSubProperties = computed(() => !!props.property.properties)

  const formComponent = computed(() => {
    if (isUnionProperty.value) {
      return PydanticFormUnionProperty
    }

    // TODO: Should we support intersection properties? The Pydantic docs (https://pydantic-docs.helpmanual.io/usage/schema/) have examples for Union types
    // but not for intersectin, which makes it difficult to understand the shape and intent.
    // For now this will fall back to a raw JSON input
    // if (isIntersectionProperty.value) {
    //   return PydanticFormIntersectionProperty
    // }

    return PydanticFormField
  })
</script>

<style>
.pydantic-form-property__section-header {
  @apply
  text-rose-400
}
</style>