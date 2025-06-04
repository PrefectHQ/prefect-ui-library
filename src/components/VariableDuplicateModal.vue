<template>
  <p-modal v-model:showModal="internalValue" :title="localization.info.duplicateVariable(variable.name)">
    <p-form @submit="submit">
      <p-content>
        <p-label :label="localization.info.name" :state="nameState" :message="nameErrorMessage">
          <p-text-input v-model="name" :state="nameState" />
        </p-label>

        <p-label :label="localization.info.value" :state="valueState" :message="valueErrorMessage">
          <JsonInput v-model="value" :state="valueState" show-format-button />
        </p-label>

        <p-label :label="localization.info.tags">
          <p-tags-input v-model="tags" />
        </p-label>
      </p-content>
    </p-form>

    <template #actions>
      <p-button variant="default" :loading="pending" @click="submit">
        {{ localization.info.duplicate }}
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useValidation, useValidationObserver, ValidationRule } from '@prefecthq/vue-compositions'
  import { isNull } from 'lodash'
  import { computed, ref, watch } from 'vue'
  import JsonInput from '@/components/JsonInput.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Variable, VariableCreate, MAX_VARIABLE_NAME_LENGTH, MAX_VARIABLE_VALUE_LENGTH } from '@/models'
  import { isLessThanOrEqual, isRequired, isString, isJson, isSlug } from '@/utilities'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    showModal: boolean,
    variable: Variable,
  }>()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'create', value: Variable): void,
  }>()

  const internalValue = computed({
    get() {
      return props.showModal
    },
    set(value: boolean): void {
      emit('update:showModal', value)
    },
  })

  const api = useWorkspaceApi()

  const nameIsUnique: ValidationRule<string | undefined> = async (value, label, { signal, source, previousValue }) => {
    if (value === previousValue) {
      return
    }

    if (source === 'validator') {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Consistent debounce with CreateModal
    }

    if (signal.aborted) {
      return
    }

    if (isNull(value) || !isString(value) || value.trim() === '') {
      return false
    }

    try {
      const existingVariable = await api.variables.getVariableByName(value)
      return existingVariable ? localization.error.variableAlreadyExists : true
    } catch {
      /* Variable doesn't exist: silence is golden */
      return true
    }
  }

  const { validate, pending } = useValidationObserver()

  const name = ref<string>(props.variable.name + '_copy')
  const value = ref<string>(props.variable.valueString ?? '')
  const tags = ref<string[]>([...(props.variable.tags ?? [])])

  watch(() => props.variable, (newVariable) => {
    name.value = newVariable.name + '_copy'
    value.value = newVariable.valueString ?? ''
    tags.value = [...(newVariable.tags ?? [])]
  }, { deep: true })

  const rules: Record<string, ValidationRule<string | undefined>[]> = {
    name: [isRequired(localization.info.name), isLessThanOrEqual(MAX_VARIABLE_NAME_LENGTH)(localization.info.name), isSlug, nameIsUnique],
    value: [isRequired(localization.info.value), isLessThanOrEqual(MAX_VARIABLE_VALUE_LENGTH)(localization.info.value), isJson(localization.info.value)],
  }

  const { error: nameErrorMessage, state: nameState } = useValidation(name, localization.info.name, rules.name)
  const { error: valueErrorMessage, state: valueState } = useValidation(value, localization.info.value, rules.value)

  const submit = async (): Promise<void> => {
    const valid = await validate()
    
    if (valid) {
      try {
        const values: VariableCreate = {
          name: name.value!,
          value: value.value!,
          tags: tags.value,
        }
        const variable = await api.variables.createVariable(values)
        
        showToast(localization.success.duplicateVariable, 'success')
        emit('create', variable)
        internalValue.value = false
      } catch (error) {
        console.error(error)
        const message = getApiErrorMessage(error, localization.error.duplicateVariable)
        showToast(message, 'error')
      }
    }
  }
</script>