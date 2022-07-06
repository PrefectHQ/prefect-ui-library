<template>
  <component :is="formComponent" v-model="internalValue" :definition="propertyDefinition" :property="property" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PydanticFormField from './PydanticFormField.vue'
  import PydanticFormIntersectionProperty from './PydanticFormIntersectionProperty.vue'
  import PydanticFormUnionProperty from './PydanticFormUnionProperty.vue'
  import { hasAnyOf, hasAllOf, PydanticPropertyRecord, PydanticTypeDefinition } from '@/types/Pydantic'

  const props = defineProps<{
    modelValue?: unknown,
    property: PydanticPropertyRecord,
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

  const isUnionProperty = computed(() => hasAnyOf(props.property))
  const isIntersectionProperty = computed(() => hasAllOf(props.property))

  const formComponent = computed(() => {
    if (isUnionProperty.value) {
      return PydanticFormUnionProperty
    }

    if (isIntersectionProperty.value) {
      return PydanticFormIntersectionProperty
    }

    return PydanticFormField
  })

  const propertyDefinition = computed(() => {
    if (isUnionProperty.value || isIntersectionProperty.value) {
      return props.definition
    }

    return props.property
  })
</script>