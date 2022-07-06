<template>
  <DemoSection heading="Parameters Form">
    <PydanticForm v-model="parameterValues" :definition="parameterDefinition" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { computed, reactive } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import PydanticForm from '@/components/PydanticForm.vue'
  import type { PydanticTypeDefinition } from '@/types/Pydantic'

  const definition = JSON.parse('{ "type": "orion", "flow_name": "test-params", "flow_parameter_schema": {"title": "Parameters", "type": "object", "properties": {"baz": {"title": "baz", "allOf": [{"$ref": "#/definitions/Foo"}]}, "bar": {"title": "bar", "anyOf": [{"$ref": "#/definitions/Foo"}, {"$ref": "#/definitions/Bar"}]}, "foo": {"title": "foo", "allOf": [{"$ref": "#/definitions/Foo"}]}}, "required": ["baz", "bar"], "definitions": {"Foo": {"title": "Foo", "type": "object", "properties": {"usu": {"title": "Usu", "type": "boolean"}, "odio": {"title": "Odio", "type": "integer"}, "dico": {"title": "Dico", "type": "number"}, "oblique": {"title": "Oblique", "type": "string"}, "no": {"title": "No", "type": "string", "format": "binary"}, "et": {"title": "Et", "type": "array", "items": {}}, "expaton": {"title": "Expaton", "type": "array", "items": {"anyOf": [{"type": "string"}, {"type": "integer"}, {"type": "number"}, {"type": "boolean"}]}}, "luribus": {"title": "Luribus", "type": "array", "items": [{"type": "string"}, {"type": "integer"}, {"type": "number"}, {"type": "boolean"}]}, "rationibus": {"title": "Rationibus", "type": "array", "items": {"type": "string"}}, "pro": {"title": "Pro", "type": "array", "items": {}}, "volumus": {"title": "Volumus", "type": "object"}, "accusata": {"title": "Accusata", "type": "array", "items": {}, "uniqueItems": true}, "volutpat": {"title": "Volutpat", "type": "array", "items": {}, "uniqueItems": true}, "at": {"title": "At", "type": "null"}, "concludaturque": {"title": "Concludaturque", "type": "string", "format": "date"}, "ne": {"title": "Ne", "type": "string", "format": "time"}, "sit": {"title": "Sit", "type": "string", "format": "date-time"}, "ex": {"title": "Ex", "type": "number", "format": "time-delta"}, "integre": {"title": "Integre"}, "ponderum": {"title": "Ponderum", "type": "string"}, "ponderosum": {"title": "Ponderosum", "type": "string"}, "quo": {"title": "Quo", "type": "string"}, "mutat": {"title": "Mutat", "type": "array", "items": {}}, "platonem": {"title": "Platonem", "type": "object"}, "recteque": {"title": "Recteque", "type": "array", "items": {}}}, "required": ["usu", "odio", "dico", "oblique", "no", "et", "expaton", "luribus", "rationibus", "pro", "volumus", "accusata", "volutpat", "at", "concludaturque", "ne", "sit", "ex", "ponderosum", "mutat", "platonem", "recteque"]}, "Bar": {"title": "Bar", "type": "object", "properties": {"z": {"title": "Z", "type": "string"}}, "required": ["z"]}}}, "serializer": {"type": "source"}, "block_document_id": "4a91603e-46be-44bc-9e7b-abdfe2c224ef"}')

  const parameterDefinition = computed<PydanticTypeDefinition>(() => {
    return definition.flow_parameter_schema
  })

  const parameterValues = reactive<Record<string, unknown>>({})
</script>