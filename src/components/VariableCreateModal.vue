<template>
  <p-modal v-model:showModal="internalValue" :title="localization.info.newVariable">
    <p-form @submit="submit">
      <p-content>
        <p-label :label="localization.info.name" :state="nameState" :message="errors.name">
          <p-text-input v-model="name" :state="nameState" />
        </p-label>
        <p-label :label="localization.info.value" :state="valueState" :message="errors.value">
          <p-text-input v-model="value" :state="valueState" />
        </p-label>
      </p-content>
    </p-form>

    <template #actions>
      <p-button :loading="isSubmitting" @click="submit">
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
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import { useWorkspaceApi, useForm } from '@/compositions'
  import { localization } from '@/localization'
  import { fieldRules, isRequired, isValidIf } from '@/utilities'

  interface Variable {
    name: string,
    value: string,
  }

  const props = defineProps<{
    showModal: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const internalValue = computed({
    get() {
      return props.showModal
    },
    set(value: boolean): void {
      emits('update:showModal', value)
    },
  })

  const api = useWorkspaceApi()

  const isUnique = isValidIf(async () => {
    const variable = await api.variables.getVariableByName(name.value)
    return !variable
  })
  const rules = fieldRules('Name', isRequired, [isUnique, 'Variable with this name already exists'])

  const { handleSubmit, isSubmitting, errors } = useForm<Variable>()
  const { value: name, meta: nameState } = useField<string>('name', rules)
  const { value: value, meta: valueState } = useField<string>('value')

  const submit = handleSubmit(async (values) => {
    try {
      await api.variables.createVariable(values)

      showToast(localization.success.createVariable, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.createVariable, 'error')
    }
  })
</script>