<template>
  <ul v-if="errors.length" class="schema-form-property-errors">
    <template v-for="(error, index) in errors" :key="index">
      <template v-if="isString(error)">
        <li>{{ error }}</li>
      </template>

      <template v-if="isSchemaValuePropertyError(error)">
        <li>
          <span>{{ error.property }}</span>
          <SchemaFormPropertyErrors :errors="error.errors" />
        </li>
      </template>

      <template v-if="isSchemaValueIndexError(error)">
        <li>
          <span>Index {{ error.index }}</span>
          <SchemaFormPropertyErrors :errors="error.errors" />
        </li>
      </template>
    </template>
  </ul>
</template>

<script lang="ts" setup>
  import { SchemaValueError, isSchemaValuePropertyError, isSchemaValueIndexError } from '@/schemas/types/schemaValuesValidationResponse'
  import { isString } from '@/utilities'

  defineProps<{
    errors: SchemaValueError[],
  }>()
</script>

<style>
.schema-form-property-errors { @apply
  text-invalid
  text-sm
  list-disc
  ml-4
}
</style>