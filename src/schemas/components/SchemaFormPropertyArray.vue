<template>
  <div class="schema-form-property-array">
    <template v-if="empty">
      <p class="schema-form-property-array__empty">
        No items in this list
      </p>
    </template>
    <p-draggable-list v-model="value" allow-create allow-delete :generator="generator">
      <template #item="{ index, handleDown, handleUp, deleteItem, moveToTop, moveToBottom }">
        <div class="schema-form-property-array__item">
          <PIcon icon="DragHandle" class="schema-form-property-array__handle" @mousedown="handleDown" @mouseup="handleUp" />

          <SchemaFormPropertyInput v-model:value="value[index]" :property="getPropertyForIndex(index)" />

          <SchemaFormPropertyMenu v-model:kind="kind">
            <template v-if="!isFirstIndex(index)">
              <p-overflow-menu-item icon="ArrowSmallUpIcon" label="Move to top" @click="moveToTop" />
            </template>
            <template v-if="!isLastIndex(index)">
              <p-overflow-menu-item icon="ArrowSmallDownIcon" label="Move to bottom" @click="moveToBottom" />
            </template>

            <p-overflow-menu-item icon="TrashIcon" label="Delete" @click="deleteItem" />
          </SchemaFormPropertyMenu>
        </div>
      </template>
    </p-draggable-list>
  </div>
</template>

<script lang="ts" setup>
  import { isArray } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import SchemaFormPropertyInput from '@/schemas/components/SchemaFormPropertyInput.vue'
  import SchemaFormPropertyMenu from '@/schemas/components/SchemaFormPropertyMenu.vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { PrefectKind } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    property: SchemaProperty & { type: 'array' },
    value: unknown[] | null,
  }>()

  const property = useSchemaProperty(() => props.property)
  const empty = computed(() => !props.value?.length)
  const kind = ref<PrefectKind>('none')

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

  function getPropertyForIndex(index: number): SchemaProperty {
    if (isArray(property.value.items)) {
      return property.value.items[index] ?? {}
    }

    return property.value.items ?? {}
  }

  function generator(): unknown {
    const index = value.value.length
    const property = getPropertyForIndex(index)

    return property.default ?? null
  }

  function isFirstIndex(index: number): boolean {
    return index === 0
  }

  function isLastIndex(index: number): boolean {
    return index === (props.value?.length ?? 0) - 1
  }
</script>

<style>
.schema-form-property-array .p-draggable-list__item { @apply
  block
}

.schema-form-property-array .p-draggable-list > .p-button {
  margin-left: 30px;
}

.schema-form-property-array__empty { @apply
  text-subdued
  text-sm
  italic;
  margin-left: 30px;
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