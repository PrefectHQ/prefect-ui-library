<template>
  <DemoSection heading="Parameters Form">
    <p-label label="Schema">
      <JsonEditor v-model="rawDefinition" />
    </p-label>

    <p-button size="sm" class="mt-2" @click="reloadForm">
      Reload form
    </p-button>

    <p-divider class="my-4" />

    <PydanticForm v-if="showForm" v-model="value" :pydantic-schema="parsedDefinition" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { computed, nextTick, reactive, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import JsonEditor from '@/components/JsonEditor.vue'
  import PydanticForm from '@/components/PydanticForm.vue'
  import type { PydanticTypeDefinition } from '@/types/Pydantic'

  const rawDefinition = ref('{"title": "Parameters", "type": "object", "properties": {"description": {"title": "description", "type": "string"}, "valid": {"title": "valid", "type": "boolean"}, "created": {"title": "created", "type": "string", "format": "date-time"}, "tags": {"title": "tags", "type": "array", "items": {}}, "cost": {"title": "cost", "type": "number"}, "users": {"title": "users", "default": 0, "type": "integer"}, "category": {"title": "category", "default": "Math", "allOf": [{"$ref": "#/definitions/Categories"}]}}, "required": ["description", "valid", "created", "tags", "cost"], "definitions": {"Categories": {"title": "Categories", "description": "An enumeration.", "enum": ["Math", "Literature", "Fine Art", "Biology", "Chemistry", "Foreign Language", "Computer Science"], "type": "string"}}}')
  const parsedDefinition = computed<PydanticTypeDefinition>(() => {
    const parsed = JSON.parse(rawDefinition.value)
    console.log(parsed)
    return parsed.flow_parameter_schema ?? parsed
  })

  const value = reactive({})

  const showForm = ref(true)

  const reloadForm = async (): Promise<void> => {
    showForm.value = false
    await nextTick()
    showForm.value = true
  }
</script>