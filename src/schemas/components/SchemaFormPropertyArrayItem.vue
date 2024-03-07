<template>
  <p-content class="schema-form-property-array-item" secondary>
    <div class="schema-form-property-array-item__control">
      <PIcon icon="DragHandle" class="schema-form-property-array-item__handle" @mousedown="emit('handleDown')" @mouseup="emit('handleUp')" />

      <component :is="input.component" v-bind="input.props" />

      <SchemaFormPropertyMenu v-model:kind="kind" :property="property">
        <template v-if="!isFirst">
          <p-overflow-menu-item icon="ArrowSmallUpIcon" label="Move to top" @click="emit('moveToTop')" />
        </template>
        <template v-if="!isLast">
          <p-overflow-menu-item icon="ArrowSmallDownIcon" label="Move to bottom" @click="emit('moveToBottom')" />
        </template>

        <p-overflow-menu-item icon="TrashIcon" label="Delete" @click="emit('deleteItem')" />
      </SchemaFormPropertyMenu>
    </div>
    <p v-if="errorMessage" class="schema-form-property-array-item__error">
      {{ errorMessage }}
    </p>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormPropertyMenu from '@/schemas/components/SchemaFormPropertyMenu.vue'
  import { usePrefectKind } from '@/schemas/compositions/usePrefectKind'
  import { useSchemaPropertyInput } from '@/schemas/compositions/useSchemaPropertyInput'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { SchemaValue } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { getAllRootSchemaPropertyErrors, getSchemaPropertyError } from '@/schemas/utilities/errors'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
    isLast: boolean,
    isFirst: boolean,
    errors: SchemaValueError[],
  }>()

  const emit = defineEmits<{
    'update:value': [SchemaValue],
    'moveToTop': [],
    'moveToBottom': [],
    'deleteItem': [],
    'handleDown': [],
    'handleUp': [],
  }>()

  const value = computed({
    get() {
      return props.value
    },
    set(value) {
      emit('update:value', value)
    },
  })

  const { input } = useSchemaPropertyInput(() => props.property, value, () => props.errors)
  const { kind } = usePrefectKind(value)
  const errorMessage = computed(() => {
    const errors = getAllRootSchemaPropertyErrors(props.errors)

    const { message } = getSchemaPropertyError(errors)

    return message
  })
</script>

<style>
.schema-form-property-array-item__control { @apply
  grid
  gap-2
  items-start;
  grid-template-columns: min-content 1fr min-content;
}

.schema-form-property-array-item__error { @apply
  text-sm
  text-invalid;
  margin-left: var(--schema-form-property-array-item-indent);
}

.schema-form-property-array-item__handle { @apply
  cursor-grab
  mt-2
}
</style>