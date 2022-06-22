<template>
  <p-form class="deployment-form" :loading="isSubmitting" @submit="submit" @cancel="cancel">
    <p-label label="Name " :message="errors.name" :state="nameState">
      <p-text-input v-model="name" :state="nameState" />
    </p-label>
  </p-form>
</template>

<script lang="ts" setup>
  import { useField, useForm } from 'vee-validate'
  import { computed, reactive, ref } from 'vue'
  import { Deployment, IDeploymentRequest, DeploymentFormValues, FlowData, Schedule } from '@/models'
  import { isRequired, withMessage } from '@/services/validate'
  import { FlowRunnerType } from '@/types/FlowRunnerType'

  const props = defineProps<{
    flowId?: string,
    deployment?: Deployment,
  }>()

  const internalValue = reactive(new DeploymentFormValues(props.deployment ?? { flowId: props.flowId }))

  const { handleSubmit, isSubmitting, errors } = useForm({ initialValues: internalValue })

  const rules = {
    name: [withMessage(isRequired, 'Name is required')],
  }

  const { value: name, meta: nameState } = useField<string>('name', rules.name)
  const { value: flowId } = useField<string>('flowId')
  const { value: flowData } = useField<FlowData>('flowData')
  const { value: schedule } = useField<Schedule>('schedule')
  const { value: isScheduleActive } = useField<boolean | undefined>('isScheduleActive')
  const { value: parameters } = useField<Record<string, unknown> | null>('parameters')
  const { value: tags } = useField<string[] | null>('tags')
  const { value: flowRunner } = useField<FlowRunnerType>('flowRunner')

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