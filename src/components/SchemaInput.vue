<template>
  <div class="schema-input">
    <slot name="button-group" v-bind="{ inputType, setInputType }">
      <p-button-group v-model="inputType" :options="inputTypeOptions" size="sm" />
    </slot>

    <template v-if="values && hasPropertiesInSchema">
      <template v-if="inputType === 'form'">
        <SchemaFormFieldsWithValues v-model:values="values" :schema="schema" />
      </template>

      <template v-else-if="inputType === 'json'">
        <p-label :state="state" :message="error">
          <p-code-input v-model="jsonValues" lang="json" :min-lines="3" show-line-numbers />
        </p-label>
      </template>

      <template v-else>
        <slot name="null-input-type" />
      </template>
    </template>

    <template v-else>
      <slot name="empty">
        <em>{{ localization.info.schemaHasNoProperties }}</em>
      </slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useValidation } from '@prefecthq/vue-compositions'
  import { merge } from 'lodash'
  import { computed, ref } from 'vue'
  import { SchemaFormFieldsWithValues } from '@/components'
  import { localization } from '@/localization'
  import { getSchemaDefaultValues } from '@/services'
  import { SchemaInputType, isSchemaInputType } from '@/types/schemaInput'
  import { Schema, SchemaValues } from '@/types/schemas'
  import { isJson, fieldRules, stringifyUnknownJson, parseUnknownJson, isRecord } from '@/utilities'

  const props = defineProps<{
    modelValue: SchemaValues | null | undefined,
    schema: Schema,
    defaultInputType?: SchemaInputType,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SchemaValues | null | undefined): void,
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

  const inputType = ref<SchemaInputType>(props.defaultInputType ?? 'form')
  const setInputType = (value: unknown): void => {
    if (isSchemaInputType(value)) {
      inputType.value = value
    }
  }

  const values = computed({
    get() {
      return props.modelValue
    },
    set(value: SchemaValues | null | undefined) {
      validateAndEmit(value)
    },
  })

  const rules = {
    jsonValues: fieldRules(localization.info.values, isJson),
  }

  const jsonValues = ref(stringifyUnknownJson(merge(getSchemaDefaultValues(props.schema), props.modelValue)))
  const { error, state, validate } = useValidation(jsonValues, localization.info.values, rules.jsonValues)

  const validateAndEmit = async (value: SchemaValues | null | undefined): Promise<void> => {
    if (inputType.value == 'json') {
      const valid = await validate()

      if (!valid) {
        return
      }

      const parsed = parseUnknownJson(jsonValues)
      if (isRecord(parsed)) {
        emit('update:modelValue', parsed)
      }
    } else {
      emit('update:modelValue', value)
    }
  }
</script>