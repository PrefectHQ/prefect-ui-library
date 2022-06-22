<template>
  <p-form class="deployment-form" :loading="isSubmitting" @submit="submit" @cancel="cancel">
    <p-label label="Name " :message="errors.name" :state="nameState">
      <p-text-input v-model="name" :state="nameState" />
    </p-label>

    <p-label label="Flow">
      <FlowCombobox v-model:selected="flowId" empty-message="Select flow" :disabled="!!props.flowId" />
    </p-label>

    <p-label label="Schedule">
      <template v-if="schedule">
        <p-toggle v-model="isScheduleActive" />
        {{ schedule }}
      </template>

      <template v-else>
        <p-button inset size="sm">
          Add schedule
        </p-button>
      </template>
    </p-label>

    <p-label label="Tags">
      <p-tags-input v-model:tags="tags" empty-message="Add tags" />
    </p-label>

    <template v-if="deployment?.parameters">
      <p-label label="Parameters" />
      <DeploymentParametersTable :parameters="deployment.parameters" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useField, useForm } from 'vee-validate'
  import { reactive } from 'vue'
  import DeploymentParametersTable from './DeploymentParametersTable.vue'
  import FlowCombobox from './FlowCombobox.vue'
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

  // How do we handle this??
  const { value: flowData } = useField<FlowData>('flowData')

  const { value: schedule } = useField<Schedule>('schedule')
  const { value: isScheduleActive } = useField<boolean>('isScheduleActive')

  const { value: parameters } = useField<Record<string, unknown> | null>('parameters')

  const { value: tags } = useField<string[] | null>('tags')

  // How do we handle this??
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
.deployment-form {
  @apply border-[1px] border-gray-300 px-6 py-6 rounded-lg
}

.deployment-form__section-header {
  @apply text-base text-gray-500
}
</style>