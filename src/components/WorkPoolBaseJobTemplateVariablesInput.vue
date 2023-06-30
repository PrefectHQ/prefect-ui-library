<template>
  <SchemaInput
    v-model="internalDefaultValues"
    :schema="schema"
  >
    <template #button-group>
      <!-- We don't want to allow JSON input for this schema input but want to get the benefits of the v-model form -->
      <p-message info>
        <p-markdown-renderer :text="localization.info.baseJobTemplateDefaults" />
      </p-message>
    </template>

    <template #empty>
      <p-message warning>
        <p-markdown-renderer :text="localization.info.baseJobTemplateVariablesEmpty" />
      </p-message>
    </template>
  </SchemaInput>
</template>


<script lang="ts" setup>
  import { isEqual } from 'lodash'
  import { computed, ref, watch } from 'vue'
  import SchemaInput from '@/components/SchemaInput.vue'
  import { localization } from '@/localization'
  import { BaseJobTemplate, SchemaPropertiesResponse, SchemaResponse } from '@/models'
  import { getSchemaDefaultValues, getSchemaPropertyRequestValue, mapper, schemaPropertyServiceFactory } from '@/services'
  import { Schema, SchemaProperty, SchemaValues } from '@/types'

  const props = defineProps<{
    variables?: SchemaResponse,
  }>()

  const emit = defineEmits<{
    (event: 'update:variables', value: SchemaResponse): void,
  }>()

  const internalVariables = computed({
    get() {
      return props.variables ?? {}
    },
    set(value: SchemaResponse) {
      emit('update:variables', value)
    },
  })

  const schema = computed<Schema>(() => mapper.map('SchemaResponse', internalVariables.value, 'Schema'))

  const getResponseSchemaWithUpdatedDefaultValues = (values: SchemaValues, unmappedSchema: SchemaResponse, mappedSchema: Schema): SchemaResponse => {
    const unmappedSchemaValues = mapper.map('SchemaValues', { values, schema: mappedSchema }, 'SchemaValuesRequest')
    const entries = Object.entries(mappedSchema.properties ?? {})

    if (!entries.length) {
      return unmappedSchema
    }

    const properties = entries.reduce<SchemaPropertiesResponse>((acc, [key, property]) => {
      if (property) {
        unmappedSchema.properties![key]!.default = getSchemaPropertyRequestValue(property, unmappedSchemaValues[key])
      }
      acc[key] = property
      return acc
    }, {})

    return properties
  }

  const internalDefaultValues = ref<SchemaValues>({})

  watch(internalDefaultValues, (newVal, oldVal) => {
    console.log('updating default internal values')
    if (isEqual(newVal, oldVal)) {
      console.log('isequal')
      return
    }

    const newSchema = getResponseSchemaWithUpdatedDefaultValues(newVal, internalVariables.value, schema.value)
    console.log('not equal', internalVariables.value, newSchema)

    // internalVariables.value = updateSchemaDefaultValues(newVal, internalVariables.value, schema.value)
  }, { deep: true })
</script>