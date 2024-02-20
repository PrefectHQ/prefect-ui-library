<template>
  <p-label class="schema-form-property" :state="error.state" :message="error.message">
    <template #label>
      <div class="schema-form-property__header">
        <span class="schema-form-property__label" :class="classes.label">{{ label }}</span>

        <SchemaFormPropertyMenu v-model:kind="kind" class="ml-auto" :property="property" :disabled="omitted" flat>
          <template v-if="!required" #default>
            <p-overflow-menu-item :label="omitLabel" @click="toggleValue" />
          </template>
        </SchemaFormPropertyMenu>
      </div>
    </template>

    <template v-if="description" #description>
      <div class="schema-form-property__description">
        <p-markdown-renderer :text="description" class="schema-form-property__markdown" />
      </div>
    </template>

    <fieldset class="schema-form-property__fields" :class="classes.fields" :disabled="disabled || omitted">
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
  import { computed, ref, onMounted } from 'vue'
  import SchemaFormPropertyMenu from '@/schemas/components/SchemaFormPropertyMenu.vue'
  import { usePrefectKind } from '@/schemas/compositions/usePrefectKind'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { useSchemaPropertyInput } from '@/schemas/compositions/useSchemaPropertyInput'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { SchemaValue } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { getSchemaPropertyError } from '@/schemas/utilities/errors'
  import { isNullish } from '@/utilities'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
    required: boolean,
    errors: SchemaValueError[],
  }>()

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  const error = computed(() => getSchemaPropertyError(props.errors))
  const { property, label, description, disabled } = useSchemaProperty(() => props.property, () => props.required)
  const omitted = ref(false)
  const omittedValue = ref<SchemaValue>(null)
  const omitLabel = computed(() => omitted.value ? 'Include value' : 'Omit value')
  const initialized = ref(false)

  onMounted(() => {
    initialized.value = true
  })

  const classes = computed(() => ({
    label: {
      'schema-form-property__label--omitted': omitted.value,
    },
    fields: {
      'schema-form-property__fields--omitted': omitted.value,
    },
  }))

  const value = computed({
    get() {
      if (isNotNullish(omittedValue.value)) {
        return omittedValue.value
      }

      if (isNotNullish(props.value)) {
        return props.value
      }

      if (!initialized.value && isNotNullish(property.value.default)) {
        return property.value.default
      }

      return null
    },
    set(value) {
      emit('update:value', value ?? undefined)
    },
  })

  if (isNullish(props.value) && isNotNullish(property.value.default)) {
    emit('update:value', property.value.default)
  }

  const { kind } = usePrefectKind(value)
  const { input } = useSchemaPropertyInput(property, value, () => props.errors)

  function toggleValue(): void {
    if (omitted.value) {
      value.value = omittedValue.value
      omittedValue.value = null
      omitted.value = false

      return
    }

    value.value = undefined
    omittedValue.value = value.value
    omitted.value = true
  }
</script>

<style>
.schema-form-property .p-label__header { @apply
  items-stretch
}

.schema-form-property__header { @apply
  flex
  gap-2
  items-center
}

.schema-form-property__label--omitted { @apply
  line-through
}

.schema-form-property__omitted { @apply
  text-subdued
}

.schema-form-property__fields { @apply
  grid
  grid-cols-1
  gap-1
}

.schema-form-property__fields--omitted { @apply
  opacity-75
}

.schema-form-property__fields[disabled] { @apply
  !cursor-not-allowed
}

.schema-form-property__fields[disabled] * {
  cursor: inherit;
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