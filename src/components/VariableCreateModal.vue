<template>
  <p-modal v-model:showModal="internalValue" :title="localization.info.newVariable">
    <p-form @submit="submit">
      <p-content>
        <p-label :label="localization.info.name" :state="nameState" :message="nameErrorMessage">
          <p-text-input v-model="name" :state="nameState" />
        </p-label>

        <p-label :label="localization.info.value" :state="valueState" :message="valueErrorMessage">
          <p-text-input v-model="value" :state="valueState" />
        </p-label>

        <p-label :label="localization.info.tags">
          <p-tag-input v-model="tags" />
        </p-label>
      </p-content>
    </p-form>

    <template #actions>
      <p-button :loading="pending" @click="submit">
        Create
      </p-button>
    </template>
    <template #cancel>
      <p-button inset @click="internalValue = false">
        Close
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useDebouncedRef, useValidation, useValidationObserver, ValidationRule } from '@prefecthq/vue-compositions'
  import { isNull } from 'lodash'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { VariableCreate } from '@/models'
  import { isRequired, isString, isValidIf } from '@/utilities'

  const props = defineProps<{
    showModal: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
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

  const isUnique = isValidIf(async (value) => {
    if (isNull(value) || !isString(value)) {
      return false
    }
    const variable = await api.variables.getVariableByName(value)
    return !variable
  })

  const { validate, pending } = useValidationObserver()
  const name = ref<string>()
  const nameDebounced = useDebouncedRef(name, 1000)
  const value = ref<string>()
  const tags = ref<string[]>([])

  const rules: Record<string, ValidationRule<string | undefined>[]> = {
    name: [isRequired(localization.info.name), isUnique(localization.error.variableAlreadyExists)],
    value: [isRequired(localization.info.value)],
  }

  const { error: nameErrorMessage, state: nameState } = useValidation(nameDebounced, localization.info.name, rules.name)
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

        await api.variables.createVariable(values)

        showToast(localization.success.createVariable, 'success')
        internalValue.value = false
      } catch (error) {
        console.error(error)
        showToast(localization.error.createVariable, 'error')
      }
    }
  }
</script>