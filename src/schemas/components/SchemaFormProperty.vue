<template>
  <p-label v-if="initialized" class="schema-form-property" :state="error.state" :message="error.message">
    <template #label>
      <div class="schema-form-property__header">
        <span class="schema-form-property__label" :class="classes.label">{{ label }}</span>

        <SchemaFormPropertyMenu
          v-model:value="value"
          :kind
          class="ml-auto"
          :property
          :disabled="omitted"
          flat
          @update:kind="setKind"
        >
          <template v-if="!required" #default>
            <p-overflow-menu-item :label="omitLabel" @click="toggleValue" />
          </template>
        </SchemaFormPropertyMenu>
      </div>
    </template>

    <slot :kind />

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
  import { isDefined, isNotNullish } from '@prefecthq/prefect-design'
  import isEqual from 'lodash.isequal'
  import { computed, ref, watch } from 'vue'
  import SchemaFormPropertyMenu from '@/schemas/components/SchemaFormPropertyMenu.vue'
  import { usePrefectKindValue } from '@/schemas/compositions/usePrefectKindValue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { useSchemaPropertyInput } from '@/schemas/compositions/useSchemaPropertyInput'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { SchemaValue, getPrefectKindFromValue } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { getSchemaPropertyError } from '@/schemas/utilities/errors'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
    required: boolean,
    errors: SchemaValueError[],
    // In cases like SchemaFormPropertyAnyOf or SchemaPropertyAllOf the property is modified before being passed into this component
    // But in order to do proper validation of the value we want to use the full unmodified property.
    propertyForValidation?: SchemaProperty,
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


  const kind = computed(() => getPrefectKindFromValue(() => props.value))
  const error = computed(() => getSchemaPropertyError(getErrors()))
  const { property, label, description, disabled } = useSchemaProperty(() => props.property, () => props.required)
  const omitted = ref(false)
  const omittedValue = ref<SchemaValue>(null)
  const omitLabel = computed(() => omitted.value ? 'Include value' : 'Omit value')
  const initialized = ref(false)

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

      if (isDefined(props.value)) {
        return props.value
      }

      if (!initialized.value && isDefined(property.value.default)) {
        return property.value.default
      }

      return undefined
    },
    set(value) {
      if (!initialized.value) {
        return
      }

      emit('update:value', value)
    },
  })

  if (!isDefined(props.value) && isDefined(property.value.default)) {
    emit('update:value', property.value.default)

    const unwatch = watch(() => props.value, () => {
      if (isEqual(props.value, property.value.default)) {
        initialized.value = true
        unwatch()
      }
    })
  } else {
    initialized.value = true
  }

  const { errors: propertyErrors, setKind } = usePrefectKindValue({ value, property: () => props.propertyForValidation ?? props.property })
  const { input } = useSchemaPropertyInput(property, value, getErrors)

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

  function getErrors(): SchemaValueError[] {
    if (propertyErrors.value.length) {
      return propertyErrors.value
    }

    return props.errors
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