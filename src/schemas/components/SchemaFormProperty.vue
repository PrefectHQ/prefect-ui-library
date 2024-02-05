<template>
  <p-label class="schema-form-property">
    <template #label>
      <div class="schema-form-property__header">
        <span>{{ label }}</span>

        <SchemaFormPropertyMenu v-model:kind="kind" flat />
      </div>
    </template>

    <template v-if="description" #description>
      <div class="schema-form-property__description">
        <p-markdown-renderer :text="description" class="schema-form-property__markdown" />
      </div>
    </template>

    <fieldset class="schema-form-property__fields" :disabled="disabled">
      <template v-if="Boolean(property.const)">
        <p class="schema-form-property__const">
          {{ property.title ?? 'Field' }} is a const and cannot be changed
        </p>
      </template>

      <keep-alive>
        <component :is="input.component" v-bind="input.props" />
      </keep-alive>
    </fieldset>
  </p-label>
</template>

<script lang="ts" setup>
  import { isNotNullish } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormPropertyMenu from '@/schemas/components/SchemaFormPropertyMenu.vue'
  import { usePrefectKind } from '@/schemas/compositions/usePrefectKind'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { useSchemaPropertyInput } from '@/schemas/compositions/useSchemaPropertyInput'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { SchemaValue } from '@/schemas/types/schemaValues'
  import { isNullish } from '@/utilities'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
    required: boolean,
  }>()

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  const { property, label, description, disabled } = useSchemaProperty(() => props.property, () => props.required)

  const value = computed({
    get() {
      if (isNotNullish(props.value)) {
        return props.value
      }

      if (isNotNullish(property.value.default)) {
        return property.value.default
      }

      return null
    },
    set(value) {
      emit('update:value', value)
    },
  })

  if (isNullish(props.value) && isNotNullish(property.value.default)) {
    emit('update:value', property.value.default)
  }

  const { kind } = usePrefectKind(value)
  const { input } = useSchemaPropertyInput(property, value)
</script>

<style>
.schema-form-property .p-label__header { @apply
  items-stretch
}

.schema-form-property__header { @apply
  flex
  justify-between
  items-center
}

.schema-form-property__fields { @apply
  grid
  grid-cols-1
  gap-1
}

.schema-form-property__fields[disabled] { @apply
  cursor-not-allowed
}

.schema-form-property__markdown { @apply
  text-subdued
  text-sm
}

.schema-form-property__const { @apply
  text-subdued
  text-sm
}
</style>