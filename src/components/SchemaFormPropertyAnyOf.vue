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
  import { useField } from 'vee-validate'
  import { computed, ref, watch } from 'vue'
  import SchemaFormProperty from './SchemaFormProperty.vue'
  import { getSchemaPropertyDefaultValue } from '@/services/schemas'
  import { SchemaPropertyAnyOf } from '@/types/schemas'

  const props = defineProps<{
    propKey: string,
    property: SchemaPropertyAnyOf,
  }>()

  const selected = ref(0)
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

  const { value, setValue } = useField(props.propKey)

  watch(selected, selected => {
    setValue(selectedDefinitionValueMap[selected])
  })

  watch(value, value => {
    selectedDefinitionValueMap[selected.value] = value
  })
</script>

<style>
.schema-form-property-any-of__section-header { @apply
  text-lg
  font-semibold
}

.schema-form-property-any-of__fields { @apply
  border-gray-300
  border-[1px]
  p-4
  rounded
}
</style>