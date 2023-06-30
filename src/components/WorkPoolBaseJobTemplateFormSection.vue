<template>
  <p-content class="work-pool-base-job-template-form-section">
    <p-label :label="localization.info.baseJobTemplate" />

    <p-button-group v-model="inputType" :options="inputTypeOptions" size="sm" />
    <template v-if="internalJobTemplate">
      <keep-alive>
        <WorkPoolBaseJobTemplateDefaultsInput
          v-if="showCustom"
          v-model:base-job-template="internalJobTemplate"
        />

        <WorkPoolBaseJobTemplateInput
          v-else-if="showAdvanced"
          v-model:base-job-template="internalJobTemplate"
        />
      </keep-alive>
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { usePatchRef, useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref, watchEffect } from 'vue'
  import WorkPoolBaseJobTemplateDefaultsInput from '@/components/WorkPoolBaseJobTemplateDefaultsInput.vue'
  import WorkPoolBaseJobTemplateInput from '@/components/WorkPoolBaseJobTemplateInput.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkPoolFormValues } from '@/models'

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
      emit('update:workPool', value)
    },
  })

  const internalJobTemplate = usePatchRef(internalWorkPool, 'baseJobTemplate')

  // Note: we could pretty easily add a default "null" option here
  type InputType = 'custom' | 'advanced' | null
  const inputTypeOptions: (ButtonGroupOption & { value: InputType })[] = [{ label: 'Custom', value: 'custom' }, { label: 'Advanced', value: 'advanced' }]
  const inputType = ref<InputType>('custom')

  const showAdvanced = computed(() => inputType.value === 'advanced')
  const showCustom = computed(() => inputType.value === 'custom')

  watchEffect(() => {
    if (inputType.value === null) {
      internalJobTemplate.value = selectedWorker.value?.defaultBaseJobTemplate
    }
  })
</script>