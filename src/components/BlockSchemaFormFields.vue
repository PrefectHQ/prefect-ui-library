<template>
  <p-content class="block-schema-form-fields">
    <template v-for="(property, key) in blockSchema.fields.properties" :key="property.title">
      <template v-if="isBlockSchemaReferenceProperty(property)">
        <BlockSchemaPropertyReferenceInput
          :selected="getReferenceValue(key)"
          :block-type-name="getReferenceTypeName(key)!"
          :required="isRequired(key)"
          @update:selected="setReferenceValue(key, $event!)"
        />
      </template>
      <template v-else>
        <BlockSchemaPropertyInput
          :value="getPropertyValue(key)"
          :property="property"
          :required="isRequired(key)"
          @update:value="setPropertyValue(key, $event)"
        />
      </template>
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BlockSchemaPropertyInput from './BlockSchemaPropertyInput.vue'
  import BlockSchemaPropertyReferenceInput from '@/components/BlockSchemaPropertyReferenceInput.vue'
  import { BlockSchema, BlockDocumentData } from '@/models'
  import { isBlockDocumentDataReference, isBlockSchemaReferenceProperty } from '@/utilities/blocks'


  const props = defineProps<{
    blockSchema: BlockSchema,
    data: BlockDocumentData,
  }>()

  const emit = defineEmits<{
    (event: 'update:data', value: BlockDocumentData): void,
    (event: 'submit' | 'cancel'): void,
  }>()

  const model = computed({
    get(): BlockDocumentData {
      return props.data
    },
    set(value: BlockDocumentData): void {
      emit('update:data', value)
    },
  })

  function isRequired(blockSchemaPropertyKey: string): boolean {
    return props.blockSchema.fields.required.includes(blockSchemaPropertyKey)
  }

  function getPropertyValue(blockSchemaPropertyKey: string): unknown {
    return props.data[blockSchemaPropertyKey]
  }

  function setPropertyValue(blockSchemaPropertyKey: string, value: unknown): void {
    model.value = { ...model.value, [blockSchemaPropertyKey]: value }
  }

  function getReferenceValue(blockSchemaPropertyKey: string): string | null {
    const value = getPropertyValue(blockSchemaPropertyKey)

    if (!isBlockDocumentDataReference(value)) {
      return null
    }

    return value.$ref.blockDocumentId
  }

  function getReferenceTypeName(blockSchemaPropertyKey: string): string | null {
    const reference = props.blockSchema.fields.blockSchemaReferences[blockSchemaPropertyKey]

    if (reference === undefined) {
      return null
    }

    return reference.blockTypeName
  }

  function setReferenceValue(blockSchemaPropertyKey: string, value: string): void {
    model.value = {
      ...model.value,
      [blockSchemaPropertyKey]: {
        $ref: {
          blockDocumentId: value,
        },
      },
    }
  }
</script>

<style>

</style>