<template>
  <section>
    <h3 class="pydantic-form-intersection-property__section-header">
      {{ title }}
    </h3>

    <template v-for="(subProperty, key) in properties" :key="key">
      <PydanticFormProperty :property="subProperty" :schema="schema" :level="level" />
    </template>
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import { isPydanticTypeRef, PydanticPropertyRecordAllOf, PydanticTypeDefinition, hasTypeRef } from '@/types/Pydantic'
  import { getTypeDefinitionFromTypeRef } from '@/utilities/pydanticMapper'

  const props = defineProps<{
    modelValue?: unknown,
    property: PydanticPropertyRecordAllOf,
    schema: PydanticTypeDefinition,
    level: number,
  }>()

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

  const properties = computed(() => {
    return props.property.allOf.map((prop) => {
      if (hasTypeRef(prop) && isPydanticTypeRef(prop.$ref)) {
        const propDef = getTypeDefinitionFromTypeRef(prop.$ref, props.schema)

        if (propDef) {
          return propDef
        }
      }

      return prop
    }).reduce((props: PydanticTypeDefinition[], prop) => {
      let existingPropIndex = props.findIndex(prop_ => prop_.title == prop.title)

      if (existingPropIndex > -1) {
        let existingProp = props[existingPropIndex]

        existingProp = { ...existingProp, ...prop }
        props.splice(existingPropIndex, 1, existingProp)
      } else {
        props.push(prop)
      }
      return props
    }, [])
  })

  const title = computed(() => {
    return props.property.alias ?? props.property.title ?? props.property.$ref
  })
</script>

<style>
.pydantic-form-intersection-property__section-header {
  @apply text-lg font-semibold
}
</style>