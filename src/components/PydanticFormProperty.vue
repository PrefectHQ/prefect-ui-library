<template>
  <template v-if="hasSubProperties && level < 2">
    <template v-for="(subProperty, key) in property.properties" :key="key">
      <PydanticFormProperty :prop-key="`${propKey}.${key}`" :property="subProperty" :level="level + 1" />
    </template>
  </template>

  <template v-else>
    <template v-if="level > 0">
      <h3 class="pydantic-form-property__section-header">
        <span>{{ property.title }}</span>
      </h3>
    </template>

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
  import { hasAllOf, hasAnyOf } from '@/types/Pydantic'
  import { SchemaProperty } from '@/types/schemas'

  const props = withDefaults(defineProps<{
    level?: number,
    propKey: string,
    property: SchemaProperty,
  }>(), {
    level: 0,
  })

  const isUnionProperty = computed(() => hasAnyOf(props.property))
  const isIntersectionProperty = computed(() => hasAllOf(props.property))
  const hasSubProperties = computed(() => !!props.property.properties)

  const classes = computed(() => {
    return {
      component: [`pydantic-form-property__component--level-${props.level}`],
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
.pydantic-form-property__section-header { @apply
  font-medium
  -mb-4
}

.pydantic-form-property__component { @apply
  pl-2
}

.pydantic-form-property__component--level-0 { @apply
  pl-0
}
</style>