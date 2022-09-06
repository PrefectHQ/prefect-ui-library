<template>
  <DemoSection heading="Parameters Form">
    <p-content>
      <p-label label="Schema">
        <JsonInput v-model="rawSchema" class="demo-parameters-form-section__json-input" />
      </p-label>
      <p-label label="Value">
        <JsonView :value="rawValue" />
      </p-label>
      <p-label label="Request">
        <JsonView :value="requestRawValue" />
      </p-label>

      <div class="flex gap-2">
        <p-button size="sm" @click="reloadForm">
          Reload form
        </p-button>

        <p-button size="sm" @click="generateSchema">
          Generate schema
        </p-button>
      </div>

      <div class="text-xs">
        (Reload the form to update default values)
      </div>
    </p-content>

    <p-divider class="my-4" />

    <SchemaForm v-if="showForm" v-model="value" :schema="schema" @submit="handleSubmit" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { computed, nextTick, watch, ref, toRaw } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import JsonInput from '@/components/JsonInput.vue'
  import JsonView from '@/components/JsonView.vue'
  import SchemaForm from '@/components/SchemaForm.vue'
  import { mocker, mapper } from '@/services'
  import { Schema, SchemaValues } from '@/types/schemas'
  import { stringify } from '@/utilities/json'

  const value = ref({})
  const showForm = ref(true)
  const rawSchema = ref(stringify(mocker.create('schema')))

  const schema = computed<Schema>(() => {
    try {
      const parsed = JSON.parse(rawSchema.value)
      const mapped = mapper.map('SchemaResponse', parsed, 'Schema')

      return mapped
    } catch (error) {
      console.error(error)

      return {}
    }
  })

  const rawValue = computed(() => stringify(value.value))
  const requestRawValue = computed(() => stringify(mapper.map('SchemaValues', { values: value.value, schema: schema.value }, 'SchemaValuesRequest')))

  watch(value, () => {
    console.log({ value: toRaw(value.value) })
  }, { deep: true })

  const reloadForm = async (): Promise<void> => {
    showForm.value = false
    await nextTick()
    showForm.value = true
  }

  const generateSchema = async (): Promise<void> => {
    showForm.value = false
    const schemaMock = mocker.create('schema')
    const schema = mapper.map('SchemaResponse', schemaMock, 'Schema')

    value.value = mapper.map('SchemaValuesResponse', { values: {}, schema }, 'SchemaValues')
    rawSchema.value = stringify(schemaMock)

    await nextTick()
    showForm.value = true
  }

  const handleSubmit = (value: SchemaValues): void => {
    console.log('form submitted', value)
  }

  generateSchema()
</script>

<style>
.demo-parameters-form-section__json-input {
  resize: vertical;

  @apply
  min-h-[300px]
}
</style>