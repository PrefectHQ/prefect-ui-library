<template>
  <p-wizard :steps="steps" last-step-text="Create" show-cancel @submit="submit" @cancel="cancel">
    <template #work-pool-information>
      <WorkPoolCreateWizardStepInformation v-model:workPool="workPool" />
    </template>
    <template #work-pool-infrastructure-type>
      <WorkPoolCreateWizardStepInfrastructureType />
    </template>
    <template #work-pool-base-job-template>
      <WorkPoolCreateWizardStepBaseJobTemplate />
    </template>
  </p-wizard>
</template>

<script lang="ts" setup>
  import { WizardStep } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { WorkPoolCreateWizardStepInformation, WorkPoolCreateWizardStepInfrastructureType, WorkPoolCreateWizardStepBaseJobTemplate } from '@/components'
  import { WorkPool, WorkPoolFormValues } from '@/models'

  const router = useRouter()

  const props = defineProps<{
    workPool?: Partial<WorkPool>,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: WorkPoolFormValues): void,
  }>()

  const workPool = ref<WorkPoolFormValues>({
    name: props.workPool?.name,
    description: props.workPool?.description,
    type: props.workPool?.type,
    baseJobTemplate: props.workPool?.baseJobTemplate,
    concurrencyLimit: props.workPool?.concurrencyLimit,
    isPaused: props.workPool?.isPaused,
  })

  const steps: WizardStep[] = [
    { title: 'Information', key: 'work-pool-information' },
    { title: 'Infrastructure Type', key: 'work-pool-infrastructure-type' },
    { title: 'Base Job Template', key: 'work-pool-base-job-template' },
  ]

  function submit(): void {
    emit('submit', workPool.value)
  }

  function cancel(): void {
    router.back()
  }
</script>