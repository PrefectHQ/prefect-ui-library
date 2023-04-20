<template>
  <p-content class="schema-form-property-any-of">
    <h3 class="schema-form-property-any-of__section-header">
      {{ title }}
    </h3>

    <p-button-group v-model="selected" :options="options" size="sm" />

    <p-label class="schema-form-property-any-of__fields" :description="description">
      <template v-if="isObject">
        <p-content>
          <template v-for="(subProperty, key) in displayedDefinition.properties" :key="key">
            <SchemaFormProperty :prop-key="`${propKey}.${key}`" :property="subProperty!" />
          </template>
        </p-content>
      </template>
      <template v-else>
        <SchemaFormProperty :property="displayedDefinition" :prop-key="propKey" />
      </template>
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, ref, watch } from 'vue'
  import SchemaFormProperty from '@/components/SchemaFormProperty.vue'
  import { getSchemaPropertyDefaultValue, getSchemaValueAnyOfDefinitionIndex } from '@/services/schemas'
  import { SchemaPropertyAnyOf, SchemaValue, SchemaValues } from '@/types/schemas'

  const props = defineProps<{
    modelValue?: SchemaValues | SchemaValue,
    propKey: string,
    property: SchemaPropertyAnyOf,
  }>()


  const emit = defineEmits<{
    (event: 'update:modelValue', value: SchemaValues | SchemaValue): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? {}
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  const selected = ref(getSchemaValueAnyOfDefinitionIndex(props.property, internalValue.value) ?? 0)
  const definitions = computed(() => props.property.anyOf)
  const displayedDefinition = computed(() => definitions.value[selected.value] ?? {})
  const title = computed(() => props.property.title ?? props.propKey.split('.').pop())
  const isObject = computed(() => displayedDefinition.value.type == 'object')
  const description = computed(() => props.property.description ?? displayedDefinition.value.description)

  const options = computed<ButtonGroupOption[]>(() => definitions.value.map((prop, index) => ({
    label: prop.title ?? prop.alias ?? prop.format ?? prop.type ?? '',
    value: index,
  })))

  const selectedDefinitionValueMap = definitions.value.map(definition => getSchemaPropertyDefaultValue(definition))

  watch(selected, selected => {
    internalValue.value = selectedDefinitionValueMap[selected] ?? {}
  })

  watch(internalValue, value => {
    selectedDefinitionValueMap[selected.value] = value
  }, { immediate: true })
</script>

<style>
.schema-form-property-any-of__section-header { @apply
  text-lg
  font-semibold
}

.schema-form-property-any-of__fields { @apply
  border-background-500
  border-[1px]
  p-4
  rounded
}
</style>