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
          <p-label :state="state" :message="error">
            <p-code-input v-model="stringRef" lang="json" :min-lines="3" show-line-numbers />
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
  import { merge } from 'lodash'
  import { computed, ref, watchEffect } from 'vue'
  import { SchemaFormFields } from '@/components'
  import { useForm, useSyncedRecordString } from '@/compositions'
  import { localization } from '@/localization'
  import { getSchemaDefaultValues } from '@/services'
  import { SchemaInputType } from '@/types/schemaInput'
  import { Schema, SchemaValues } from '@/types/schemas'
  import { isJson, fieldRules, isDefined } from '@/utilities'

  const props = defineProps<{
    modelValue: SchemaValues | null | undefined,
    schema: Schema,
    inputType?: SchemaInputType,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SchemaValues | null | undefined): void,
    (event: 'update:inputType', value: SchemaInputType): void,
  }>()

  const hasPropertiesInSchema = computed(() => {
    return Object.keys(props.schema.properties ?? {}).length > 0
  })

  const inputTypeOptions = computed(() => {
    return [
      { value: 'form', label: localization.info.form },
      { value: 'json', label: localization.info.json },
    ]
  })

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

  const defaultValues = merge(getSchemaDefaultValues(props.schema), props.modelValue)
  const { stringRef, recordRef } = useSyncedRecordString(defaultValues)

  const rules = {
    jsonValues: fieldRules(localization.info.values, isJson),
  }

  const { error, state } = useValidation(stringRef, localization.info.values, rules.jsonValues)

  const { validate: validateReactiveForm, errors: reactiveFormErrors, values } = useForm({
    initialValues: recordRef,
  })

  useValidation(recordRef, localization.info.values, async () => {
    await validateReactiveForm()
    return Object.entries(reactiveFormErrors.value).length === 0
  })

  watchEffect(() => {
    if (inputType.value === 'json') {
      emit('update:modelValue', recordRef.value)
    } else {
      emit('update:modelValue', values)
    }
  })
</script>