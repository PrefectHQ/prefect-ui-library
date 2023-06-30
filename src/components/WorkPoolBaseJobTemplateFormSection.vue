<template>
  <p-content class="work-pool-base-job-template-form-section">
    <p-button-group v-model="inputType" :options="inputTypeOptions" size="sm" />
    <template v-if="internalJobTemplate">
      <WorkPoolBaseJobTemplateVariableDefaultsInput
        v-if="showCustom"
        v-model:base-job-template="internalJobTemplate"
      />

      <WorkPoolBaseJobTemplateInput
        v-if="showAdvanced"
        v-model:base-job-template="internalJobTemplate"
      />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref, watchEffect } from 'vue'
  import WorkPoolBaseJobTemplateInput from '@/components/WorkPoolBaseJobTemplateInput.vue'
  import WorkPoolBaseJobTemplateVariableDefaultsInput from '@/components/WorkPoolBaseJobTemplateVariableDefaultsInput.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { BaseJobTemplate, WorkPoolFormValues } from '@/models'

  const props = defineProps<{
    workPool: WorkPoolFormValues,
  }>()

  const api = useWorkspaceApi()
  const workersSubscription = useSubscription(api.collections.getWorkerCollectionWorkers, [])
  const workers = computed(() => workersSubscription.response ?? [])
  const selectedWorker = computed(() => workers.value.find(({ type }) => type === props.workPool.type))

  const emit = defineEmits<{
    (event: 'update:workPool', value: WorkPoolFormValues): void,
  }>()

  const internalWorkPool = computed({
    get() {
      return props.workPool
    },
    set(value) {
      console.log(value)
      // emit('update:workPool', value)
    },
  })

  const internalJobTemplate = computed<BaseJobTemplate | undefined>({
    get() {
      return internalWorkPool.value.baseJobTemplate
    },
    set(value) {
      internalWorkPool.value.baseJobTemplate = value
    },
  })

  type InputType = 'custom' | 'advanced' | null
  const inputTypeOptions: (ButtonGroupOption & { value: InputType })[] = [{ label: 'Default', value: null }, { label: 'Custom', value: 'custom' }, { label: 'Advanced', value: 'advanced' }]
  const inputType = ref<InputType>(null)

  const showAdvanced = computed(() => inputType.value === 'advanced')
  const showCustom = computed(() => inputType.value === 'custom')

  watchEffect(() => {
    if (inputType.value === null) {
      internalJobTemplate.value = selectedWorker.value?.defaultBaseJobTemplate
    }
  })
</script>