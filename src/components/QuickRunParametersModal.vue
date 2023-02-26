<template>
  <p-modal v-model:showModal="internalShowModal" class="parameters-modal" title="Run Deployment">
    <p-form @submit="submit">
      <p-content>
        <SchemaFormFields property="parameters" :schema="deployment.parameterOpenApiSchema" />
      </p-content>
    </p-form>

    <template #actions>
      <slot name="actions">
        <p-button @click="submit">
          Run
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { PButton } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormFields from '@/components/SchemaFormFields.vue'
  import { useForm } from '@/compositions/useForm'
  import { Deployment, DeploymentFlowRunCreate } from '@/models'

  const props = defineProps<{
    showModal: boolean,
    deployment: Deployment,
  }>()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'run', id: string, value: DeploymentFlowRunCreate): void,
  }>()

  const { handleSubmit } = useForm<DeploymentFlowRunCreate>({
    initialValues: {
      parameters: props.deployment.parameters,
      schema: props.deployment.parameterOpenApiSchema,
    },
  })

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  const submit = handleSubmit((values): void => {
    const resolvedValues: DeploymentFlowRunCreate = {
      state: {
        type: 'scheduled',
        message: 'Run from the Prefect UI',
      },
      ...values,
    }
    emit('run', props.deployment.id, resolvedValues)
  })
</script>
