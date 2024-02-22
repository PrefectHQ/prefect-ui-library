<template>
  <div class="schema-form-property-array">
    <template v-if="empty">
      <p class="schema-form-property-array__empty">
        No items in this list
      </p>
    </template>
    <p-draggable-list v-model="value" v-bind="{ allowCreate, generator, state }" allow-delete>
      <template #item="{ index, handleDown, handleUp, deleteItem, moveToTop, moveToBottom }">
        <SchemaFormPropertyArrayItem
          v-model:value="value[index]"
          :property="getPropertyForIndex(index)"
          :errors="getSchemaPropertyErrors(index, errors)"
          :is-first="isFirstIndex(index)"
          :is-last="isLastIndex(index)"
          @delete-item="deleteItem"
          @handle-down="handleDown"
          @handle-up="handleUp"
          @move-to-top="moveToTop"
          @move-to-bottom="moveToBottom"
        />
      </template>
    </p-draggable-list>
    <template v-if="!allowCreate && property.maxItems">
      <p class="schema-form-property-array__max">
        List can only have {{ property.maxItems }} items
      </p>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { State, isArray } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormPropertyArrayItem from '@/schemas/components/SchemaFormPropertyArrayItem.vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { getSchemaPropertyErrors } from '@/schemas/utilities/errors'

  const props = defineProps<{
    property: SchemaProperty & { type: 'array' },
    value: unknown[] | undefined,
    errors: SchemaValueError[],
    state: State,
  }>()

  const { property } = useSchemaProperty(() => props.property)
  const empty = computed(() => !props.value?.length)

  const emit = defineEmits<{
    'update:value': [unknown[] | undefined],
  }>()

  const value = computed({
    get() {
      return props.value ?? []
    },
    set(value) {
      if (value.length === 0) {
        emit('update:value', undefined)
        return
      }

      emit('update:value', value)
    },
  })

  const allowCreate = computed(() => {
    const max = props.property.maxItems ?? Infinity
    const current = props.value?.length ?? 0

    return current < max
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

    return property.default ?? undefined
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

.schema-form-property-array__max { @apply
  text-subdued
  text-sm;
  margin-left: 30px;
}
</style>