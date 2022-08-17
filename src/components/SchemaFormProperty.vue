<template>
  <div class="schema-form-property">
    <template v-if="hasSubProperties">
      <p-label :label="property.title" :description="property.description">
        <p-content>
          <template v-for="(subProperty, key) in property.properties" :key="key">
            <SchemaFormProperty :prop-key="`${propKey}.${key}`" :property="subProperty" :level="level + 1" />
          </template>
        </p-content>
      </p-label>
    </template>

    <template v-else>
      <component
        :is="formComponent"
        class="schema-form-property__component"
        :class="classes.component"
        :prop-key="propKey"
        :property="property"
        :level="level"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import SchemaFormInput from './SchemaFormInput.vue'
  import SchemaFormPropertyAllOf from './SchemaFormPropertyAllOf.vue'
  import SchemaFormPropertyAnyOf from './SchemaFormPropertyAnyOf.vue'
  import { SchemaProperty } from '@/types/schemas'

  const props = withDefaults(defineProps<{
    level?: number,
    propKey: string,
    property: SchemaProperty,
  }>(), {
    level: 0,
  })

  const hasSubProperties = computed(() => !!props.property.properties)

  const classes = computed(() => ({
    component: `schema-form-property__component--level-${props.level}`,
  }))

  const formComponent = computed(() => {
    if (props.property.anyOf) {
      return SchemaFormPropertyAnyOf
    }

    if (props.property.allOf) {
      return SchemaFormPropertyAllOf
    }

    return SchemaFormInput
  })
</script>

<style>
.schema-form-property__component { @apply
  pl-2
}

.schema-form-property__component--level-0 { @apply
  pl-0
}
</style>