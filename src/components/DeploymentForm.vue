<template>
  <p-form class="deployment-form" :loading="isSubmitting" @submit="submit" @cancel="cancel" />
</template>

<script lang="ts" setup>
  import { useField, useForm } from 'vee-validate'
  import { computed, reactive, ref } from 'vue'
  import { Deployment, IDeploymentRequest, DeploymentFormValues } from '@/models'
  import { isRequired, withMessage } from '@/services/validate'
  import { FlowRunnerType } from '@/types/FlowRunnerType'

  const props = defineProps<{
    deployment?: Deployment,
  }>()

  const internalValue = reactive(new DeploymentFormValues(props.deployment))
  const { handleSubmit, isSubmitting, errors } = useForm({ initialValues: internalValue })

  const rules = {
    name: [withMessage(isRequired, 'Name is required')],
  }

  const emit = defineEmits<{
    (event: 'submit', value: IDeploymentRequest): void,
    (event: 'cancel'): void,
  }>()

  const submit = handleSubmit(deploymentData => {
    emit('submit', deploymentData.getDeploymentRequest())
  })

  const cancel = (): void => {
    emit('cancel')
  }
</script>

<style>
.queue-form {
  @apply border-[1px] border-gray-300 px-6 pb-6 rounded-lg
}

.queue-form__section-header {
  @apply text-base text-gray-500
}
</style>