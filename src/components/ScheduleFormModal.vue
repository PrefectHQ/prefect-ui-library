<template>
  <slot :open="open" :close="close" />

  <p-modal v-model:showModal="showModal" :title="schedule ? 'Edit schedule' : 'Add schedule'" @update:show-modal="resetIfFalse">
    <p-label label="Schedule type">
      <p-button-group v-model="scheduleForm" :options="scheduleFormOptions" small />
    </p-label>

    <p-label label="Active">
      <p-toggle v-model="internalActive" />
    </p-label>

    <template v-if="scheduleForm == 'rrule'">
      <p>
        Sorry, modifying RRule schedules via the UI is currently unsupported; select a different schedule type above or modify your schedule in code.
      </p>
    </template>

    <template v-else-if="scheduleForm == 'cron'">
      <CronScheduleForm v-model:schedule="cronSchedule" v-model:disabled="cronDisabled" hide-actions @submit="submit" />
    </template>

    <template v-else-if="scheduleForm == 'interval'">
      <IntervalScheduleForm v-model:schedule="intervalSchedule" v-model:disabled="intervalDisabled" hide-actions @submit="submit" />
    </template>

    <FlowRunJobVariableOverridesLabeledInput v-if="can.access.deploymentScheduleFlowRunInfraOverrides" v-model="internalJobVariables" />

    <p-divider />

    <template v-if="schemaHasParameters">
      <SchemaInputV2 v-model:values="internalParameters" :schema="internalSchema" :errors="errors" :kinds="['none', 'json']">
        <template #default="{ kind, setKind }">
          <div class="schedule-form-modal__parameters-container">
            <h3>
              {{ localization.info.parameterOverrides }}
            </h3>
            <p-icon-button-menu small>
              <p-overflow-menu-item v-if="kind === 'json'" label="Use form input" @click="setKind('none')" />
              <p-overflow-menu-item v-if="kind === 'none'" label="Use JSON input" @click="setKind('json')" />
            </p-icon-button-menu>
          </div>
          <p-combobox v-model="selectedProperties" :options="propertyNames" empty-message="Select parameters to override for this schedule" />
        </template>
      </SchemaInputV2>
    </template>

    <template #actions>
      <p-button variant="default" type="submit" :disabled="disabled" @click="submitCurrentForm">
        Save
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import CronScheduleForm from '@/components/CronScheduleForm.vue'
  import FlowRunJobVariableOverridesLabeledInput from '@/components/FlowRunJobVariableOverridesLabeledInput.vue'
  import IntervalScheduleForm from '@/components/IntervalScheduleForm.vue'
  import { useCan, useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { CronSchedule, DeploymentScheduleCompatible, IntervalSchedule, Schedule, ScheduleType, getScheduleType, isCronSchedule, isIntervalSchedule } from '@/models'
  import { SchemaInputV2, SchemaV2, SchemaValuesV2 } from '@/schemas'
  import { useSchemaValidation } from '@/schemas/compositions/useSchemaValidation'
  import { isEmptyObject, omit, stringify } from '@/utilities'
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useValidationObserver } from '@prefecthq/vue-compositions'
  import merge from 'lodash.merge'
  import { computed, ref, watch } from 'vue'


  defineOptions({
    inheritAttrs: false,
  })

  const { showModal, open, close } = useShowModal()

  const publicOpen = (): void => {
    open()
  }

  defineExpose({ publicOpen })

  const props = defineProps<{
    active: boolean | null,
    schedule: Schedule | null,
    jobVariables: Record<string, unknown> | undefined,
    parameters: SchemaValuesV2,
    parameterOpenApiSchema: SchemaV2,
  }>()

  const can = useCan()

  const internalActive = ref<boolean>(props.active ?? true)

  const { validate } = useValidationObserver()
  const internalJobVariables = ref<string | undefined>(props.jobVariables ? stringify(props.jobVariables) : undefined)

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentScheduleCompatible): void,
  }>()

  // Parameters-related refs and compositions
  const selectedProperties = ref<string[]>([])
  const properties = computed(() => props.parameterOpenApiSchema.properties ?? {})
  const propertyNames = computed(() => Object.keys(properties.value))
  const propertiesToOmit = computed(() => propertyNames.value.filter(name => !selectedProperties.value.includes(name)))
  const internalSchema = computed(() => {
    return { ...props.parameterOpenApiSchema, required: [], properties: omit(properties.value, propertiesToOmit.value) }
  })
  const internalParameters = ref()

  // Reset values to the initial values when the modal is opened
  watch(showModal, () => {
    if (showModal.value) {
      internalParameters.value = {}
      selectedProperties.value = []
    }
  })

  // When the properties to omit change, we need add/remove properties to stay in sync
  watch(propertiesToOmit, () => {
    const newParameters = omit(internalParameters.value, propertiesToOmit.value)
    const partialDefaultParameters = omit(props.parameters, propertiesToOmit.value)
    internalParameters.value = merge(partialDefaultParameters, newParameters)
  })

  const schemaHasParameters = computed(() => !isEmptyObject(props.parameterOpenApiSchema.properties))

  const { errors, validate: validateParameters } = useSchemaValidation(props.parameterOpenApiSchema, internalParameters)


  async function submit(schedule: Schedule | null): Promise<void> {
    const valid = await validate()

    if (!valid) {
      return
    }

    let jobVariables: Record<string, unknown> | undefined
    if (!can.access.deploymentScheduleFlowRunInfraOverrides) {
      jobVariables = undefined
    } else {
      jobVariables = internalJobVariables.value ? JSON.parse(internalJobVariables.value) : undefined
    }

    emit('submit', {
      active: internalActive.value,
      schedule,
      jobVariables,
      parameters: internalParameters.value,
    })
    close()
  }

  const cronDisabled = ref<boolean>(false)
  const intervalDisabled = ref<boolean>(false)
  const disabled = computed(() => {
    return scheduleForm.value == 'rrule' ||
      scheduleForm.value == 'cron' && cronDisabled.value ||
      scheduleForm.value == 'interval' && intervalDisabled.value
  })

  const submitCurrentForm = async (): Promise<void> => {
    let schedule = null

    if (disabled.value) {
      return
    }

    if (scheduleForm.value == 'cron' && cronSchedule.value) {
      schedule = cronSchedule.value
    } else if (scheduleForm.value == 'interval' && intervalSchedule.value) {
      schedule = intervalSchedule.value
    }

    await submit(schedule)
  }

  const cronSchedule = ref<CronSchedule | undefined>(isCronSchedule(props.schedule) ? props.schedule : undefined)
  const intervalSchedule = ref<IntervalSchedule | undefined>(isIntervalSchedule(props.schedule) ? props.schedule : undefined)
  const scheduleForm = ref<ScheduleType>(getScheduleType(props.schedule) ?? 'interval')
  const scheduleFormOptions: ButtonGroupOption[] = [{ label: 'Interval', value: 'interval' }, { label: 'Cron', value: 'cron' }, { label: 'RRule', value: 'rrule' }]

  const updateInternalState = (): void => {
    cronSchedule.value = isCronSchedule(props.schedule) ? props.schedule : undefined
    intervalSchedule.value = isIntervalSchedule(props.schedule) ? props.schedule : undefined
    internalActive.value = props.active ?? true
    internalJobVariables.value = props.jobVariables ? stringify(props.jobVariables) : undefined
  }
  watch(() => props.schedule, updateInternalState)

  function resetIfFalse(val: boolean): void {
    if (!val) {
      updateInternalState()
    }
  }
</script>

<script lang="ts">
  export interface ScheduleFormModalMethods {
    publicOpen: () => void,
  }
</script>

<style>
.schedule-form-modal__parameters-container { @apply
  flex
  items-center
  justify-between
}
</style>