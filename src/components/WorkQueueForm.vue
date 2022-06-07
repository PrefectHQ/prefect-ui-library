<template>
  <p-form class="queue-form" :loading="isSubmitting" @submit="submit" @cancel="cancel">
    <p-label label="Name " :message="errors.name" :state="nameState">
      <p-text-input v-model="name" :state="nameState" />
    </p-label>

    <p-label label="Description">
      <p-text-input v-model="description" />
    </p-label>

    <p-label label="Status">
      <WorkQueueToggle v-model:workQueue="internalValue" />
    </p-label>

    <p-label label="Flow Run Concurrency (Optional)">
      <p-number-input v-model="concurrencyLimit" placeholder="Unlimited" />
    </p-label>

    <p class="queue-form__section-header">
      Filters
    </p>

    <p-label label="Tags">
      <p-tags-input v-model:tags="tags" empty-message="Add tag to filter..." />
    </p-label>

    <p-label label="Deployments">
      <DeploymentCombobox v-model:selected="deployments" empty-message="Select Deployments to filter..." />
    </p-label>

    <p-label label="Flow Runners">
      <FlowRunnerCheckboxes v-model:selected="flowRunnerTypes" />
    </p-label>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTextInput, PNumberInput, PTagsInput, PForm } from '@prefecthq/prefect-design'
  import { useField, useForm } from 'vee-validate'
  import { reactive } from 'vue'
  import FlowRunnerCheckboxes from './FlowRunnerCheckboxes.vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
  import { IWorkQueueRequest, WorkQueue, WorkQueueFormValues } from '@/models'
  import { isRequired, withMessage } from '@/services/validate'
  import { FlowRunnerType } from '@/types/FlowRunnerType'

  const props = defineProps<{
    workQueue?: WorkQueue,
  }>()

  const internalValue = reactive(new WorkQueueFormValues(props.workQueue))
  const { handleSubmit, isSubmitting, errors } = useForm({ initialValues: internalValue })

  const rules = {
    name: [withMessage(isRequired, 'Queue name is Required')],
  }

  const { value: name, meta: nameState } = useField<string>('name', rules.name)
  const { value: description } = useField<string|null>('description')
  const { value: concurrencyLimit } = useField<number|null>('concurrencyLimit')
  const { value: tags } = useField<string[]>('filter.tags')
  const { value: deployments } = useField<string[]>('filter.deploymentIds')
  const { value: flowRunnerTypes } = useField<FlowRunnerType[]>('filter.flowRunnerTypes')

  const emit = defineEmits<{
    (event: 'submit', value: IWorkQueueRequest): void,
    (event: 'cancel'): void,
  }>()

  const submit = handleSubmit(workQueueData => {
    console.log(workQueueData.getWorkQueueRequest())
    emit('submit', workQueueData.getWorkQueueRequest())
  })
  function cancel(): void {
    emit('cancel')
  }
</script>

<style>
.queue-form {
  @apply
  border-[1px]
  border-gray-300
  px-6
  pb-6
  rounded-lg
}

.queue-form__section-header {
  @apply
  text-base
  text-gray-500
}
</style>