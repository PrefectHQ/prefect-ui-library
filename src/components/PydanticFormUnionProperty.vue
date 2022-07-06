<template>
  <section>
    <h3 class="pydantic-form-union-property__section-header">
      {{ title }}
    </h3>

    <p-button-group v-model="propertyDefinitionRef" :options="buttonGroupOptions" size="sm" />

    <template v-for="(subProperty, key) in properties" :key="key">
      <PydanticFormProperty :property="subProperty" :definition="definition" />
    </template>
  </section>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import PydanticFormField from './PydanticFormField.vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import { isPydanticTypeRef, PydanticPropertyRecordAnyOf, PydanticTypeDefinition, hasTypeRef } from '@/types/Pydantic'
  import { getTypeDefinitionFromTypeRef } from '@/utilities/pydanticMapper'

  const props = defineProps<{
    modelValue?: unknown,
    property: PydanticPropertyRecordAnyOf,
    definition: PydanticTypeDefinition,
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

  const propertyDefinitionRef = ref()

  const title = computed(() => {
    return props.property.alias ?? props.property.title ?? props.property.$ref
  })

  const properties = computed(() => {
    return props.property.anyOf.map((prop) => {
      if (hasTypeRef(prop) && isPydanticTypeRef(prop.$ref)) {
        const propDef = getTypeDefinitionFromTypeRef(prop.$ref, props.definition)

        if (propDef) {
          return propDef
        }
      }

      return prop
    })
  })

  const buttonGroupOptions = computed<ButtonGroupOption[]>(() => {
    return properties.value.map((prop) => {
      const option: ButtonGroupOption = {
        label: '',
        value: '',
      }

      option.label = prop.alias ?? prop.title ?? ''
      option.value = prop.alias ?? prop.title ?? ''

      return option
    })
  })
</script>

<style>
.pydantic-form-union-property__section-header {
  @apply
  text-lg
  font-semibold
}
</style>