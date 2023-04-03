<template>
  <p-modal v-model:showModal="internalValue" :title="localization.info.newVariable">
    <p-form @submit="submit">
      <p-content>
        <p-label :label="localization.info.name" :state="nameState" :message="nameErrorMessage">
          <p-text-input v-model="name" :state="nameState" />
        </p-label>

        <p-label :label="localization.info.value" :state="valueState" :message="valueErrorMessage">
          <p-textarea v-model="value" :state="valueState" :rows="1" />
        </p-label>

        <p-label :label="localization.info.tags">
          <p-tags-input v-model="tags" />
        </p-label>
      </p-content>
    </p-form>

    <template #actions>
      <p-button :loading="pending" @click="submit">
        {{ localization.info.create }}
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useValidation, useValidationObserver, ValidationRule } from '@prefecthq/vue-compositions'
  import { isNull } from 'lodash'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Variable, VariableCreate } from '@/models'
  import { isHandle, isRequired, isString } from '@/utilities'

  const VALUE_MAX_CHARS = 255

  const props = defineProps<{
    showModal: boolean,
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

  const valueIsLessThanOrEqual: ValidationRule<string | undefined> = (value) => {
    if (isNull(value) || !isString(value)) {
      return false
    }

    return value.length <= VALUE_MAX_CHARS ? true : localization.error.stringValueTooLong(localization.info.value, VALUE_MAX_CHARS)
  }

  const nameIsUnique: ValidationRule<string | undefined> = async (value, label, { signal, source, previousValue }) => {
    if (value === previousValue) {
      return
    }

    if (source === 'validator') {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    if (signal.aborted) {
      return
    }

    if (isNull(value) || !isString(value)) {
      return false
    }

    try {
      const variable = await api.variables.getVariableByName(value)
      return variable ? localization.error.variableAlreadyExists : true
    } catch {
      /* Variable doesn't exist: silence is golden */
      return true
    }
  }

  const { validate, pending } = useValidationObserver()
  const name = ref<string>()
  const value = ref<string>()
  const tags = ref<string[]>([])

  const rules: Record<string, ValidationRule<string | undefined>[]> = {
    name: [isRequired(localization.info.name), isHandle(localization.info.name), nameIsUnique],
    value: [isRequired(localization.info.value), valueIsLessThanOrEqual],
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

        showToast(localization.success.createVariable, 'success')
        emit('create', variable)
        internalValue.value = false
      } catch (error) {
        console.error(error)
        showToast(localization.error.createVariable, 'error')
      }
    }
  }
</script>