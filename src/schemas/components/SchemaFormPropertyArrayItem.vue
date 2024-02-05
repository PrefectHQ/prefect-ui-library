<template>
  <div class="schema-form-property-array-item">
    <PIcon icon="DragHandle" class="schema-form-property-array-item__handle" @mousedown="emit('handleDown')" @mouseup="emit('handleUp')" />

    <keep-alive>
      <component :is="input.component" v-bind="input.props" />
    </keep-alive>

    <SchemaFormPropertyMenu v-model:kind="kind">
      <template v-if="!isFirst">
        <p-overflow-menu-item icon="ArrowSmallUpIcon" label="Move to top" @click="emit('moveToTop')" />
      </template>
      <template v-if="!isLast">
        <p-overflow-menu-item icon="ArrowSmallDownIcon" label="Move to bottom" @click="emit('moveToBottom')" />
      </template>

      <p-overflow-menu-item icon="TrashIcon" label="Delete" @click="emit('deleteItem')" />
    </SchemaFormPropertyMenu>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormPropertyMenu from '@/schemas/components/SchemaFormPropertyMenu.vue'
  import { usePrefectKind } from '@/schemas/compositions/usePrefectKind'
  import { useSchemaPropertyInput } from '@/schemas/compositions/useSchemaPropertyInput'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { SchemaValue } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
    isLast: boolean,
    isFirst: boolean,
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

  const { input } = useSchemaPropertyInput(() => props.property, value)
  const { kind } = usePrefectKind(value)
</script>

<style>
.schema-form-property-array-item { @apply
  grid
  gap-2
  items-start;
  grid-template-columns: min-content 1fr min-content;
}

.schema-form-property-array-item__handle { @apply
  cursor-grab
  mt-2
}
</style>