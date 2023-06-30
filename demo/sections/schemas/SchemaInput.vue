<template>
  <ComponentPage title="SchemaInput">
    <SchemaInput v-model="parameters" :schema="schema" />

    <pre>{{ parameters }}</pre>
    <p-button @click="submit">
      Submit
    </p-button>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { useValidationObserver } from '@prefecthq/vue-compositions'
  import { useField } from 'vee-validate'
  import { ref } from 'vue'
  import SchemaInput from '@/components/SchemaInput.vue'
  import { useForm } from '@/compositions/useForm'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services/Mocker'
  import { SchemaValues } from '@/types/schemas'

  const schema = mocker.create('schema')

  const { handleSubmit } = useForm({
    initialValues: {
      parameters: {},
    },
  })

  const { value: parameters } = useField<SchemaValues>('parameters')

  const { validate } = useValidationObserver()

  const submit = handleSubmit(async (values): Promise<void> => {
    const valid = await validate()

    if (!valid) {
      return
    }

    console.log(values)
  })
</script>
