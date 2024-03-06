<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" :title="schedule ? 'Edit schedule' : 'Add schedule'">
    <p-label label="Schedule type">
      <p-button-group v-model="scheduleForm" :options="scheduleFormOptions" small />
    </p-label>

    <p-label v-if="can.access.enhancedSchedulingUi" label="Active">
      <p-toggle v-model="internalActive" />
    </p-label>

    <template v-if="scheduleForm == 'rrule'">
      <p>
        Sorry, modifying RRule schedules via the UI is currently unsupported; select a different schedule type above or modify your schedule in code.
      </p>
    </template>

    <template v-else-if="scheduleForm == 'cron'">
      <CronScheduleForm v-model:schedule="cronSchedule" v-model:disabled="cronDisabled" hide-actions @submit="scheduleFormSubmit" />
    </template>

    <template v-else-if="scheduleForm == 'interval'">
      <IntervalScheduleForm v-model:schedule="intervalSchedule" v-model:disabled="intervalDisabled" hide-actions @submit="scheduleFormSubmit" />
    </template>

    <p-label v-if="can.access.flowRunInfraOverrides" label="Job Variables (Optional)" :message="jobVariablesError" :state="jobVariablesState">
      <JobVariableOverridesInput v-model="internalJobVariables" :state="jobVariablesState" />
    </p-label>

    <template #actions>
      <p-button primary type="submit" :disabled="disabled" @click="submitCurrentForm">
        Save
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useValidation } from '@prefecthq/vue-compositions'
  import { computed, ref, watch } from 'vue'
  import { isJson } from '..'
  import CronScheduleForm from '@/components/CronScheduleForm.vue'
  import IntervalScheduleForm from '@/components/IntervalScheduleForm.vue'
  import JobVariableOverridesInput from '@/components/JobVariableOverridesInput.vue'
  import { useCan, useShowModal } from '@/compositions'
  import { DeploymentScheduleCompatible, getScheduleType, Schedule, ScheduleType, isCronSchedule, isIntervalSchedule, CronSchedule, IntervalSchedule } from '@/models'

  const { showModal, open, close } = useShowModal()

  const publicOpen = (): void => {
    open()
  }

  defineExpose({ publicOpen })

  const can = useCan()

  const props = defineProps<DeploymentScheduleCompatible>()

  const internalActive = ref<boolean>(props.active ?? true)

  const internalJobVariables = ref<string | undefined>(props.jobVariables ? JSON.stringify(props.jobVariables, null, 2) : undefined)
  const { validate, state: jobVariablesState, error: jobVariablesError } = useValidation(internalJobVariables, isJson('Job variables'))

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentScheduleCompatible): void,
  }>()


  const scheduleFormSubmit = (schedule: Schedule): void => {
    submit({ 'active': internalActive.value, 'schedule': schedule, jobVariables: internalJobVariables.value ? JSON.parse(internalJobVariables.value) : internalJobVariables.value })
  }

  const submit = (schedule: DeploymentScheduleCompatible): void => {
    validate().then(isValid => {
      if (!isValid) {
        return
      }
      emit('submit', schedule)
      close()
    })
  }

  const cronDisabled = ref<boolean>()
  const intervalDisabled = ref<boolean>()
  const disabled = computed(() => {
    return scheduleForm.value == 'rrule' || scheduleForm.value == 'cron' && cronDisabled.value || scheduleForm.value == 'interval' && intervalDisabled.value
  })

  const submitCurrentForm = (): void => {
    let schedule = null

    if (disabled.value) {
      return
    }

    if (scheduleForm.value == 'cron' && cronSchedule.value) {
      schedule = cronSchedule.value
    } else if (scheduleForm.value == 'interval' && intervalSchedule.value) {
      schedule = intervalSchedule.value
    }

    submit({
      'active': internalActive.value,
      schedule,
      jobVariables: internalJobVariables.value ? JSON.parse(internalJobVariables.value) : internalJobVariables.value,
    })
  }

  const cronSchedule = ref<CronSchedule | undefined>(isCronSchedule(props.schedule) ? props.schedule : undefined)
  const intervalSchedule = ref<IntervalSchedule | undefined>(isIntervalSchedule(props.schedule) ? props.schedule : undefined)
  const scheduleForm = ref<ScheduleType>(getScheduleType(props.schedule) ?? 'interval')
  const scheduleFormOptions: ButtonGroupOption[] = [{ label: 'Interval', value: 'interval' }, { label: 'Cron', value: 'cron' }, { label: 'RRule', value: 'rrule' }]

  const updateInternalState = (): void => {
    cronSchedule.value = isCronSchedule(props.schedule) ? props.schedule : undefined
    intervalSchedule.value = isIntervalSchedule(props.schedule) ? props.schedule : undefined
    internalActive.value = props.active ?? true
    internalJobVariables.value = props.jobVariables ? JSON.stringify(props.jobVariables, null, 2) : undefined
  }
  watch(() => props.schedule, updateInternalState)
</script>

<script lang="ts">
  export interface ScheduleFormModalMethods {
    publicOpen: () => void,
  }
</script>