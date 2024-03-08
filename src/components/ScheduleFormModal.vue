<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" :title="schedule ? 'Edit schedule' : 'Add schedule'">
    <p-label label="Schedule type">
      <p-button-group v-model="scheduleForm" :options="scheduleFormOptions" small />
    </p-label>

    <p-toggle v-model="internalActive" />

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

    <FlowRunJobVariableOverridesLabeledInput v-model="internalJobVariables" />

    <template #actions>
      <p-button primary type="submit" :disabled="disabled" @click="submitCurrentForm">
        Save
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useValidationObserver } from '@prefecthq/vue-compositions'
  import { computed, ref, watch } from 'vue'
  import CronScheduleForm from '@/components/CronScheduleForm.vue'
  import FlowRunJobVariableOverridesLabeledInput from '@/components/FlowRunJobVariableOverridesLabeledInput.vue'
  import IntervalScheduleForm from '@/components/IntervalScheduleForm.vue'
  import { useCan, useShowModal } from '@/compositions'
  import { DeploymentScheduleCompatible, getScheduleType, Schedule, ScheduleType, isCronSchedule, isIntervalSchedule, CronSchedule, IntervalSchedule } from '@/models'
  import { stringify } from '@/utilities'

  const { showModal, open, close } = useShowModal()

  const publicOpen = (): void => {
    open()
  }

  defineExpose({ publicOpen })

  const props = defineProps<DeploymentScheduleCompatible>()

  const can = useCan()

  const internalActive = ref<boolean>(props.active ?? true)

  const { validate } = useValidationObserver()
  const internalJobVariables = ref<string | undefined>(props.jobVariables ? stringify(props.jobVariables) : undefined)

  const emit = defineEmits<{
    (event: 'submit', value: DeploymentScheduleCompatible): void,
  }>()


  async function submit(schedule: Schedule | null): Promise<void> {
    const valid = await validate()

    if (!valid) {
      return
    }

    let jobVariables: Record<string, unknown> | undefined
    if (!can.access.flowRunInfraOverrides) {
      jobVariables = undefined
    } else {
      jobVariables = internalJobVariables.value ? JSON.parse(internalJobVariables.value) : undefined
    }

    emit('submit', {
      active: internalActive.value,
      schedule,
      jobVariables,
    })
    close()
  }

  const cronDisabled = ref<boolean>()
  const intervalDisabled = ref<boolean>()
  const disabled = computed(() => {
    return scheduleForm.value == 'rrule' || scheduleForm.value == 'cron' && cronDisabled.value || scheduleForm.value == 'interval' && intervalDisabled.value
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
    internalJobVariables.value = props.jobVariables ? JSON.stringify(props.jobVariables, null, 2) : undefined
  }
  watch(() => props.schedule, updateInternalState)
</script>

<script lang="ts">
  export interface ScheduleFormModalMethods {
    publicOpen: () => void,
  }
</script>