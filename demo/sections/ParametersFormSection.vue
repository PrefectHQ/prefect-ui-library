<template>
  <DemoSection heading="Parameters Form">
    <p-label label="Schema">
      <JsonInput v-model="rawSchema" class="demo-parameters-form-section__json-input" />
    </p-label>

    <p-button size="sm" class="mt-2" @click="reloadForm">
      Reload form
    </p-button>

    <p-button size="sm" class="mt-2 ml-2" @click="generateSchema">
      Generate schema
    </p-button>

    <div class="text-xs my-2">
      (Reload the form to update default values)
    </div>

    <p-divider class="my-4" />

    <SchemaForm v-if="showForm" v-model="value" :schema="schema" @submit="handleSubmit" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { computed, nextTick, watch, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import JsonInput from '@/components/JsonInput.vue'
  import SchemaForm from '@/components/SchemaForm.vue'
  import { mocker, mapper } from '@/services'
  import { Schema, SchemaValues } from '@/types/schemas'

  const value = ref({})
  const showForm = ref(true)
  const rawSchema = ref(JSON.stringify(mocker.create('schema'), undefined, 2))

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

  watch(value, () => {
    console.log({ value })
  }, { deep: true })

  const reloadForm = async (): Promise<void> => {
    showForm.value = false
    await nextTick()
    showForm.value = true
  }

  const generateSchema = (): void => {
    rawSchema.value = JSON.stringify(mocker.create('schema'), undefined, 2)
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