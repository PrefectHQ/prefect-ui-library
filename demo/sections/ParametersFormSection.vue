<template>
  <DemoSection heading="Parameters Form">
    <p-label label="Schema">
      <JsonEditor v-model="rawDefinition" />
    </p-label>

    <p-button size="sm" class="mt-2" @click="reloadForm">
      Reload form
    </p-button>

    <div class="text-xs my-2">
      (Reload the form to update default values)
    </div>

    <p-divider class="my-4" />

    <PydanticForm v-if="showForm" v-model="value" :pydantic-schema="parsedDefinition" @submit="handleSubmit" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { computed, nextTick, watch, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import JsonEditor from '@/components/JsonEditor.vue'
  import PydanticForm from '@/components/PydanticForm.vue'
  import type { PydanticTypeDefinition } from '@/types/Pydantic'

  const rawDefinition = ref('{"title": "Parameters", "type": "object", "properties": {"description": {"title": "description", "type": "string"}, "valid": {"title": "valid", "type": "boolean"}, "created": {"title": "created", "type": "string", "format": "date-time"}, "tags": {"title": "tags", "type": "array", "items": {}}, "cost": {"title": "cost", "type": "number"}, "users": {"title": "users", "default": 0, "type": "integer"}, "category": {"title": "category", "default": "Math", "allOf": [{"$ref": "#/definitions/Categories"}]}}, "required": ["description", "valid", "created", "tags", "cost"], "definitions": {"Categories": {"title": "Categories", "description": "An enumeration.", "enum": ["Math", "Literature", "Fine Art", "Biology", "Chemistry", "Foreign Language", "Computer Science"], "type": "string"}}}')
  const parsedDefinition = computed<PydanticTypeDefinition>(() => {
    const parsed = JSON.parse(rawDefinition.value)
    return parsed.flow_parameter_schema ?? parsed
  })

  const value = ref({})

  const showForm = ref(true)

  watch(value, () => {
    console.log({ value })
  }, { deep: true })

  const reloadForm = async (): Promise<void> => {
    showForm.value = false
    await nextTick()
    showForm.value = true
  }

  const handleSubmit = (vals: any): void => {
    console.log('form submitted', vals)
  }
</script>