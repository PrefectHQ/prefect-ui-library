<template>
  <p-form v-on="{ cancel, submit }">
    <p-content class="block-schema-form">
      <p-label label="Block Name">
        <p-text-input v-model="nameModel" />
      </p-label>

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
  </p-form>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BlockSchemaPropertyInput from './BlockSchemaPropertyInput.vue'
  import BlockSchemaPropertyReferenceInput from '@/components/BlockSchemaPropertyReferenceInput.vue'
  import { BlockDocumentData } from '@/models/BlockDocument'
  import { BlockSchema } from '@/models/BlockSchema'
  import { isBlockDocumentDataReference, isBlockSchemaReferenceProperty } from '@/utilities/blocks'

  const props = defineProps<{
    blockSchema: BlockSchema,
    data: BlockDocumentData,
    name: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:data', value: BlockDocumentData): void,
    (event: 'update:name', value: string): void,
    (event: 'submit' | 'cancel'): void,
  }>()

  const nameModel = computed({
    get(): string {
      return props.name
    },
    set(value: string): void {
      emit('update:name', value)
    },
  })

  const dataModel = computed({
    get(): BlockDocumentData {
      return props.data
    },
    set(value: BlockDocumentData): void {
      emit('update:data', value)
    },
  })

  function submit(): void {
    emit('submit')
  }

  function cancel(): void {
    emit('cancel')
  }

  function isRequired(blockSchemaPropertyKey: string): boolean {
    return props.blockSchema.fields.required.includes(blockSchemaPropertyKey)
  }

  function getPropertyValue(blockSchemaPropertyKey: string): unknown {
    return props.data[blockSchemaPropertyKey]
  }

  function setPropertyValue(blockSchemaPropertyKey: string, value: unknown): void {
    dataModel.value = { ...dataModel.value, [blockSchemaPropertyKey]: value }
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
    dataModel.value = {
      ...dataModel.value,
      [blockSchemaPropertyKey]: {
        $ref: {
          blockDocumentId: value,
        },
      },
    }
  }
</script>

<style>
.block-schema-form__actions { @apply
  flex
  justify-end
  gap-2
}
</style>