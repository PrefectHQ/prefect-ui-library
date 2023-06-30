<template>
  <p-content class="work-pool-base-job-template-form-section">
    <p-button-group v-model="inputType" :options="inputTypeOptions" size="sm" />
    <template v-if="internalJobTemplate">
      <keep-alive>
        <SchemaInput
          v-if="showCustom"
          v-model="internalVariableDefaults"
          :schema="internalJobTemplate.schema"
        />

        <WorkPoolBaseJobTemplateInput
          v-else-if="showAdvanced"
          v-model:base-job-template="internalJobTemplate"
        />
      </keep-alive>
    </template>
  </p-content>

  <!--
    <p-tabs :tabs="['Defaults', 'Advanced']" class="overflow-auto">
    <template #defaults>
    <template v-if="variablesSchemaHasProperties">
    <p-message info class="work-pool-base-job-template-section__info_message ">
    The fields below control the default values for the base job template. These values can be overridden by deployments.
    </p-message>
    <SchemaFormFieldsWithValues
    v-model:values="currentDefaults"
    :schema="mappedVariablesSchema"
    />
    </template>
    <template v-else>
    <p-message warning>
    This work pool's base job template does not have any customizations. To add customizations, edit the base job template directly with the <b>Advanced</b> tab.
    </p-message>
    </template>
    </template>
    <template #advanced>
    <div class="work-pool-base-job-template-section__advanced_tab">
    <p-message info class="work-pool-base-job-template-section__info_message">
    This is the JSON representation of the base job template. A work pool's  job template controls infrastructure configuration for all flow runs in the work pool, and specifies the configuration that can be overridden by deployments.
    <br>
    <br>
    For more information on the structure of a work pool's base job template, check out
    <p-link :to="localization.docs.workPools">
    the docs.
    </p-link>.
    </p-message>
    <JsonInput v-model:model-value="localBaseJobTemplateJson" show-format-button @update:model-value="onLocalBaseJobTemplateJsonUpdate" />
    </div>
    </template>
    </p-tabs>
  -->
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref, watchEffect } from 'vue'
  import SchemaInput from '@/components/SchemaInput.vue'
  import WorkPoolBaseJobTemplateInput from '@/components/WorkPoolBaseJobTemplateInput.vue'
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
      emit('update:workPool', value)
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

  const internalVariableDefaults = computed({
    get() {
      return internalJobTemplate.value?.defaultValues ?? {}
    },
    set(value) {
      if (internalWorkPool.value.baseJobTemplate) {
        internalWorkPool.value.baseJobTemplate.defaultValues = value
      }
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