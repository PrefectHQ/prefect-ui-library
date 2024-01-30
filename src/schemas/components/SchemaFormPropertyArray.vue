<template>
  <p-draggable-list v-model="value" allow-create allow-delete class="schema-form-property-array" :generator="() => null">
    <template #item="{ index, handleDown, handleUp, deleteItem }">
      <div class="schema-form-property-array__item">
        <PIcon icon="DragHandle" class="schema-form-property-array__handle" @mousedown="handleDown" @mouseup="handleUp" />

        <SchemaFormPropertyInput v-model:value="value[index]" :property="property.items ?? {}" />

        <p-button icon="TrashIcon" @click="deleteItem" />
      </div>
    </template>
  </p-draggable-list>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormPropertyInput from '@/schemas/components/SchemaFormPropertyInput.vue'
  import { SchemaProperty } from '@/schemas/types/schema'

  const props = defineProps<{
    property: SchemaProperty & { type: 'array' },
    value: unknown[] | null,
  }>()

  const emit = defineEmits<{
    'update:value': [unknown[] | null],
  }>()

  const value = computed({
    get() {
      return props.value ?? []
    },
    set(value) {
      if (value.length === 0) {
        emit('update:value', null)
        return
      }

      emit('update:value', value)
    },
  })
</script>

<style>
.schema-form-property-array .p-draggable-list__item { @apply
  block
}

.schema-form-property-array__item { @apply
  grid
  gap-2
  items-start;
  grid-template-columns: min-content 1fr min-content;
}

.schema-form-property-array__handle { @apply
  cursor-grab
  mt-2
}
</style>