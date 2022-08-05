<template>
  <p-form>
    <p-content class="flow-run-form__section">
      <h3 class="flow-run-form__section-header">
        General
      </h3>

      <p-label label="Name">
        <p-text-input v-model="name">
          <template #append>
            <p-button
              class="flow-run-form__random-name-button"
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

      <!--
        <p-divider v-if="deployment.parameters" />

        <h3 class="flow-run-form__section-header">
        Start
        </h3>

        <p-button-group v-model="nowOrLater" :options="nowOrLaterOptions" size="sm" />

        <template v-if="nowOrLater == 'later'">
        <div class="flow-run-form__row">
        <p-label label="Date" class="interval-schedule-form__column--span-2">
        <p-date-input v-model="start" show-time />
        </p-label>

        <p-label label="Timezone" class="interval-schedule-form__column--span-2">
        <TimezoneSelect v-model="timezone" />
        </p-label>
        </div>
        </template>

        <p-divider v-if="deployment.parameters" />

        <h3 class="flow-run-form__section-header">
        Parameters
        </h3>

        <p-button-group v-model="overrideParameters" :options="useParametersOptions" size="sm" />

        <template v-if="overrideParameters == 'custom'">
        <PydanticForm v-model="parameters" hide-footer :pydantic-schema="deployment.parameterOpenApiSchema" />
        </template>
      -->
    </p-content>
  </p-form>
</template>

<script lang="ts" setup>
  import  { PButton, ButtonGroupOption } from '@prefecthq/prefect-design'
  import { zonedTimeToUtc } from 'date-fns-tz'
  import { useField, useForm } from 'vee-validate'
  import { ref, computed } from 'vue'
  import PydanticForm from './PydanticForm.vue'
  import TimezoneSelect from './TimezoneSelect.vue'
  // import { useParameters } from '@/compositions'
  import { Deployment, FlowRun } from '@/models'
  import { mocker } from '@/services'

  const props = defineProps<{
    modelValue?: Partial<FlowRun>,
    deployment: Deployment,
  }>()

  const generateRandomName = (): string => {
    return mocker.create('runName')
  }

  const { value: start } = useField<Date>('state.scheduledStart')
  const { value: tags } = useField<string[]>('tags')
  const { value: name } = useField<string>('name')
  const { value: stateMessage } = useField<string>('state.message')
</script>