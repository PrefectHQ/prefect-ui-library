<template>
  <p-content class="schema-input">
    <div class="schema-input__button-group">
      <slot name="button-group">
        <p-button-group v-model="inputType" :options="inputTypeOptions" size="sm" />
      </slot>
    </div>

    <template v-if="modelValue && hasPropertiesInSchema">
      <keep-alive>
        <template v-if="inputType === 'form'">
          <SchemaFormFields :schema="schema" />
        </template>

        <template v-else-if="inputType === 'json'">
          <p-label :state="jsonState" :message="jsonError">
            <p-code-input v-model="json" lang="json" :min-lines="3" show-line-numbers />
          </p-label>
        </template>

        <template v-else>
          <slot name="null-input-type" />
        </template>
      </keep-alive>
    </template>

    <template v-else>
      <slot name="empty">
        <em>{{ localization.info.schemaHasNoProperties }}</em>
      </slot>
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { useValidation } from '@prefecthq/vue-compositions'
  import { computed, ref, watch } from 'vue'
  import { SchemaFormFields } from '@/components'
  import { useReactiveForm } from '@/compositions'
  import { localization } from '@/localization'
  import { getSchemaDefaultValues, mapper } from '@/services'
  import { SchemaInputType } from '@/types/schemaInput'
  import { SchemaValues, Schema } from '@/types/schemas'
  import { fieldRules, isDefined, isEmptyObject, isJson, isNullish, stringify } from '@/utilities'

  const props = defineProps<{
    modelValue: SchemaValues | null | undefined,
    schema: Schema,
    inputType?: SchemaInputType,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SchemaValues | null | undefined): void,
    (event: 'update:inputType', value: SchemaInputType): void,
  }>()

  const hasPropertiesInSchema = computed(() => !isEmptyObject(props.schema.properties ?? {}))

  const inputTypeOptions = [
    { value: 'form', label: localization.info.form },
    { value: 'json', label: localization.info.json },
  ]

  const inputTypeInternal = ref<SchemaInputType>(props.inputType ?? 'form')

  const inputType = computed({
    get() {
      return isDefined(props.inputType) ? props.inputType : inputTypeInternal.value
    },
    set(value: SchemaInputType) {
      inputTypeInternal.value = value

      emit('update:inputType', value)
    },
  })

  const values = computed({
    get() {
      if (isNullish(props.modelValue) || isEmptyObject(props.modelValue)) {
        return getSchemaDefaultValues(props.schema)
      }

      return props.modelValue
    },
    set(values) {
      emit('update:modelValue', values)
    },
  })

  const mapped = toSchemaValuesRequest(values.value)
  const json = ref<string>(stringify(mapped))
  const { state: jsonState, error: jsonError } = useValidation(json, fieldRules('parameters', isJson))

  function toSchemaValuesRequest(values: SchemaValues): SchemaValues {
    return mapper.map('SchemaValues', { values, schema: props.schema }, 'SchemaValuesRequest')
  }

  function toSchemaValues(values: SchemaValues): SchemaValues {
    return mapper.map('SchemaValuesResponse', { values, schema: props.schema }, 'SchemaValues')
  }

  function shouldSync(values: SchemaValues, json: string): boolean {
    try {
      const valuesString = JSON.stringify(values)
      const jsonRequest = JSON.parse(json)
      const mappedJson = toSchemaValues(jsonRequest)
      const jsonString = JSON.stringify(mappedJson)

      return valuesString !== jsonString
    } catch {
      return false
    }
  }

  const { validate: validateReactiveForm, errors: reactiveFormErrors } = useReactiveForm(values, {
    initialValues: values.value,
  })

  useValidation(values, localization.info.values, async () => {
    await validateReactiveForm()

    return isEmptyObject(reactiveFormErrors.value)
  })

  watch(values, values => {
    if (shouldSync(values, json.value)) {
      const mappedValues = toSchemaValuesRequest(values)

      json.value = stringify(mappedValues)
    }
  })

  watch(json, json => {
    if (shouldSync(values.value, json)) {
      const parsed = JSON.parse(json)

      values.value = toSchemaValues(parsed)
    }
  })
</script>