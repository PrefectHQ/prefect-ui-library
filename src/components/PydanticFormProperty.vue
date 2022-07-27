<template>
  <template v-if="hasSubProperties && level < 2">
    <template v-for="(subProperty, key) in property.properties" :key="key">
      <PydanticFormProperty :prop-key="`${propKey}.${key}`" :property="subProperty" :level="level + 1" />
    </template>
  </template>

  <template v-else>
    <h3
      v-if="level > 0"
      class="pydantic-form-property__section-header"
    >
      <span>{{ property.title }}</span>
    </h3>

    <component
      :is="formComponent"
      class="pydantic-form-property__component"
      :class="classes.component"
      :prop-key="propKey"
      :property="property"
      :level="level"
    />
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
  })

  const isUnionProperty = computed(() => hasAnyOf(props.property))
  const isIntersectionProperty = computed(() => hasAllOf(props.property))
  const hasSubProperties = computed(() => !!props.property.properties)

  const classes = computed(() => {
    return {
      component: [`pydantic-form-property__component-level-${props.level}`],
    }
  })

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
  font-medium
  -mb-4
}

.pydantic-form-property__component { @apply
  pl-2
}

.pydantic-form-property__component-level-0 { @apply
  pl-0
}
</style>