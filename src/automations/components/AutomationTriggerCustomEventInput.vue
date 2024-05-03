<template>
  <p-form>
    <p-label label="When I">
      <p-radio-group v-model="formData.posture" class="automation-trigger-custom-event-input__posture-radio-group mt-2" :options="[{ value: 'Reactive', label: 'Observe' }, { value: 'Proactive', label: 'Don\'t observe' }]" />
    </p-label>

    <p-label label="Any event matching">
      <EventsCombobox :selected="formData.expect" multiple @update:selected="formData.expect = asArray($event)" />
    </p-label>

    <p-label label="From the following resources">
      <EventResourceCombobox
        :selected="formData.match['prefect.resource.id'] ?? []"
        multiple
        @update:selected="updateMatchResourceIds(asArray($event ?? []))"
      />
    </p-label>

    <div>
      <div class="automation-trigger-custom-event-input__threshold-and-within">
        <p-label :state="thresholdState" :message="thresholdState.error" label="Threshold" class="automation-trigger-custom-event-input__threshold-input">
          <template #label="{ id }">
            <label class="sr-only" :for="id">Threshold</label>
          </template>

          <template #default="{ id }">
            <p-number-input
              :id
              v-model="formData.threshold"
              min="1"
              :state="thresholdState"
            />
          </template>
        </p-label>

        <span class="automation-trigger-custom-event-input__threshold-and-within-in-between">{{ toPluralString('time', formData.threshold) }} within</span>

        <AutomationWithinInput v-model:time="formData.within" :posture="formData.posture" class="automation-trigger-custom-event-input__within-input">
          <template #label="{ id }">
            <label class="sr-only" :for="id">Within</label>
          </template>
        </AutomationWithinInput>
      </div>
    </div>
    <p-accordion :sections="['Evaluation Options']" class="automation-trigger-custom-event-input__evaluation-options-accordion">
      <template #content>
        <div class="automation-trigger-custom-event-input__evaluation-options-accordion-content">
          <p-label label="Evaluate trigger only after observing an event matching">
            <EventsCombobox :selected="formData.after" multiple @update:selected="formData.after = asArray($event)" />
          </p-label>

          <p-label label="Filter for events related to">
            <EventResourceCombobox
              :selected="formData.matchRelated['prefect.resource.id'] ?? []"
              multiple
              @update:selected="updateMatchRelatedResourceIds(asArray($event ?? []))"
            />
          </p-label>
        </div>
      </template>
    </p-accordion>
  </p-form>
</template>

<script setup lang="ts">
  import { useValidation } from '@prefecthq/vue-compositions'
  import EventResourceCombobox from '@/components/EventResourceCombobox.vue'
  import EventsCombobox from '@/components/EventsCombobox.vue'
  import { isRequired, isGreaterThan } from '@/utilities/validation'

  const formData = defineModel<AutomationTriggerEvent>({ required: true })

  const { state: thresholdState } = useValidation(() => formData.value.threshold, 'Threshold', [isRequired, isGreaterThan(0)])

  function updateMatchResourceIds(selectedResources: string[]): void {
    // If no resources are selected, remove the key from the match object
    // `match: { <any-key>: [] }` will match nothing
    if (selectedResources.length === 0) {
      delete formData.value.match['prefect.resource.id']
      return
    }
    formData.value.match['prefect.resource.id'] = selectedResources
  }

  function updateMatchRelatedResourceIds(selectedResources: string[]): void {
    // If no resources are selected, remove the key from the match object
    // `match_related: { <any-key>: [] }` will match nothing
    if (selectedResources.length === 0) {
      delete formData.value.matchRelated['prefect.resource.id']
      return
    }
    formData.value.matchRelated['prefect.resource.id'] = selectedResources
  }
</script>

<style>
.automation-trigger-custom-event-input__threshold-and-within { @apply
  flex gap-x-2
}

.automation-trigger-custom-event-input__threshold-and-within-in-between { @apply
  flex-shrink-0
  leading-[3rem]
}

.automation-trigger-custom-event-input__threshold-input { @apply
  max-w-[10ch]
}

.automation-trigger-custom-event-input__within-input { @apply
  max-w-56
}

.automation-trigger-custom-event-input__threshold-and-within-errors { @apply
  text-sm
  text-invalid
}

.automation-trigger-custom-event-input__posture-radio-group { @apply
  flex-row
}

.automation-trigger-custom-event-input__evaluation-options-accordion { @apply
  mt-2
}

.automation-trigger-custom-event-input__evaluation-options-accordion .p-accordion__header { @apply
  py-4
}

.automation-trigger-custom-event-input__evaluation-options-accordion-content { @apply
  grid gap-y-4
}
</style>