<template>
  <p-form @submit="submit">
    <p-content class="flow-run-create-form__section">
      <h3 class="flow-run-create-form__section-header">
        General
      </h3>

      <p-label label="Name">
        <p-text-input v-model="name">
          <template #append>
            <p-button
              class="flow-run-create-form__random-name-button"
              color="primary"
              icon="RefreshIcon"
              @click="name = generateRandomName()"
            />
          </template>
        </p-text-input>
      </p-label>

      <p-label label="Message (optional)">
        <p-textarea v-model="stateMessage" placeholder="Created from the Prefect UI" />
      </p-label>

      <p-label label="Tags">
        <p-tags-input v-model="tags" />
      </p-label>

      <p-divider v-if="deployment.parameters" />

      <h3 class="flow-run-create-form__section-header">
        Start
      </h3>

      <p-button-group v-model="when" :options="whenOptions" size="sm" />

      <template v-if="when == 'later'">
        <div class="flow-run-create-form__row">
          <p-label label="Date">
            <p-date-input v-model="start" show-time />
          </p-label>
          <p-label label="Timezone">
            <TimezoneSelect v-model="timezone" />
          </p-label>
        </div>
      </template>


      <template v-if="deployment.parameters">
        <p-divider />

        <h3 class="flow-run-form__section-header">
          Parameters
        </h3>

        <p-button-group v-model="overrideParameters" :options="overrideParametersOptions" size="sm" />

        <template v-if="overrideParameters == 'custom'">
          <PydanticForm v-model="parameters" hide-footer :pydantic-schema="deployment.parameterOpenApiSchema" />
        </template>
      </template>
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <p-button type="submit">
        Run
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import  { PButton, ButtonGroupOption } from '@prefecthq/prefect-design'
  import { zonedTimeToUtc } from 'date-fns-tz'
  import { useField, useForm } from 'vee-validate'
  import { computed, ref } from 'vue'
  import PydanticForm from './PydanticForm.vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  import { Deployment, FlowRun } from '@/models'
  import { mocker } from '@/services'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const generateRandomName = (): string => {
    return mocker.create('runName')
  }

  const emit = defineEmits<{
    (event: 'submit', value?: Partial<FlowRun>): void,
    (event: 'cancel'): void,
  }>()


  const { values } = useForm()
  const { value: start } = useField<Date>('state.scheduledStart')
  const { value: tags } = useField<string[]>('tags')
  const { value: name } = useField<string>('name', undefined, { initialValue: generateRandomName() })
  const { value: stateMessage } = useField<string>('state.message')
  const { value: parameters } = useField<Record<string, unknown>>('parameters', undefined, { initialValue: props.deployment.parameters })

  const adjustedStart = computed(() => {
    return zonedTimeToUtc(start.value, timezone.value)
  })

  const whenOptions: ButtonGroupOption[] = [{ label: 'Now', value: 'now' }, { label: 'Later', value: 'later' }]
  const when = ref('now')

  const overrideParametersOptions: ButtonGroupOption[] = [{ label: 'Default', value: 'default' }, { label: 'Custom', value: 'custom' }]
  const overrideParameters = ref('default')

  const timezone = ref('UTC')

  const cancel = (): void => emit('cancel')
  const submit = (): void => emit('submit', { ...values })
</script>

<style>
.flow-run-create-form__random-name-button { @apply
  rounded-none
  rounded-tr
  rounded-br
}
.flow-run-create-form__title { @apply
  font-semibold
  m-0
  p-0
}
.flow-run-create-form__section-header { @apply
  text-lg
  font-semibold
}
.flow-run-create-form__row { @apply
  grid
  gap-2
  grid-cols-4;
}
</style>