<template>
  <p-label class="schema-form-property" :state="error.state" :message="error.message">
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
          @update:kind="convertToKind"
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
  import debounce from 'lodash.debounce'
  import { computed, ref, onMounted, watch } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import SchemaFormPropertyMenu from '@/schemas/components/SchemaFormPropertyMenu.vue'
  import { useSchema } from '@/schemas/compositions/useSchema'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { useSchemaPropertyInput } from '@/schemas/compositions/useSchemaPropertyInput'
  import { mapSchemaValue } from '@/schemas/maps/schemaValue'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { PrefectKind, SchemaValue, getPrefectKindFromValue, isPrefectKindJson } from '@/schemas/types/schemaValues'
  import { SchemaValueError, SchemaValuesValidationResponse } from '@/schemas/types/schemaValuesValidationResponse'
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

  onMounted(() => {
    // this components onMounted is fired before its children's onMounted. So to avoid the child with a default value
    // overriding the default value set by this component we need to delay the initialization so that the default value "sticks"
    // https://github.com/PrefectHQ/prefect/issues/12566
    setTimeout(() => {
      initialized.value = true
    })
  })

  // todo preserve previous values for kinds so if we're switching from another kind and we cannot map we can fallback to the previous value

  const api = useWorkspaceApi()
  const schema = useSchema()
  const propertyErrors = ref<SchemaValueError[]>()
  const kind = computed(() => getPrefectKindFromValue(() => props.value))
  const error = computed(() => getSchemaPropertyError(propertyErrors.value ?? props.errors))
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
      emit('update:value', value)
    },
  })

  if (!isDefined(props.value) && isDefined(property.value.default)) {
    emit('update:value', property.value.default)
  }

  const { input } = useSchemaPropertyInput(property, value, () => propertyErrors.value ?? props.errors)

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

  async function convertToKind(to: PrefectKind): Promise<void> {
    if (isPrefectKindJson(props.value) && to === 'none') {
      // global form validation already has errors
      if (props.errors.length) {
        return
      }

      // double check this specific property doesn't have any errors
      const { valid } = await validatePropertyValue()

      if (!valid) {
        return
      }
    }

    const mapped = mapSchemaValue(props.value, to)

    emit('update:value', mapped)
  }

  async function validatePropertyValue(): Promise<SchemaValuesValidationResponse> {
    const propertySchema = props.propertyForValidation ?? props.property

    const response = await api.schemas.validateSchemaValue(props.value, propertySchema, schema)

    if (!response.valid) {
      propertyErrors.value = response.errors
    } else {
      propertyErrors.value = undefined
    }

    return response
  }

  const validatePropertyValueDebounced = debounce(validatePropertyValue, 1_000)

  watch(propertyErrors, (errors) => {
    if (!errors?.length) {
      return
    }

    validatePropertyValueDebounced()
  }, { deep: true })
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