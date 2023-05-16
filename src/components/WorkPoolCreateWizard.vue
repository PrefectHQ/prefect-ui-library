<template>
  <p-wizard :steps="steps" last-step-text="Create" show-cancel @submit="submit" @cancel="cancel">
    <template #work-pool-information>
      <WorkPoolCreateWizardStepInformation v-model:workPool="workPool" />
    </template>
    <template #work-pool-infrastructure-type>
      <WorkPoolCreateWizardStepInfrastructureType v-model:workPool="workPool" :workers="availableWorkers" />
    </template>
    <template #work-pool-infrastructure-configuration>
      <WorkPoolCreateWizardStepInfrastructureConfiguration v-model:workPool="workPool" :default-base-job-template="defaultBaseJobTemplate" />
    </template>
  </p-wizard>
</template>

<script lang="ts" setup>
  import { WizardStep } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { WorkPoolCreateWizardStepInformation, WorkPoolCreateWizardStepInfrastructureType, WorkPoolCreateWizardStepInfrastructureConfiguration } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkPool, WorkPoolFormValues } from '@/models'

  const router = useRouter()

  const props = defineProps<{
    workPool?: Partial<WorkPool>,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: WorkPoolFormValues): void,
  }>()

  const workPool = reactive<WorkPoolFormValues>({
    name: props.workPool?.name,
    description: props.workPool?.description,
    type: props.workPool?.type,
    baseJobTemplate: props.workPool?.baseJobTemplate,
    concurrencyLimit: props.workPool?.concurrencyLimit,
    isPaused: props.workPool?.isPaused,
  })

  const steps: WizardStep[] = [
    { title: 'Basic Information', key: 'work-pool-information' },
    { title: 'Infrastructure Type', key: 'work-pool-infrastructure-type' },
    { title: 'Configuration', key: 'work-pool-infrastructure-configuration' },
  ]

  const api = useWorkspaceApi()

  const availableWorkersSubscription = useSubscription(api.collections.getWorkerCollection, [])
  const availableWorkers = computed(() => availableWorkersSubscription.response ?? [])

  const defaultBaseJobTemplate = computed(() => {
    return availableWorkers.value.find((item) => item.type === workPool.type)?.defaultBaseJobConfiguration ?? {}
  })

  function submit(): void {
    emit('submit', workPool)
  }

  function cancel(): void {
    router.back()
  }
</script>