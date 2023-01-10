<template>
  <p-form class="work-queue-create-form" @submit="submit">
    <p-content>
      <p-label label="Name " :message="errors.name" :state="nameState">
        <p-text-input v-model="name" :state="nameState" />
      </p-label>

      <p-label label="Description (Optional)">
        <p-textarea v-model="description" rows="7" />
      </p-label>

      <p-label label="Status (Optional)">
        <p-toggle v-model="isActive">
          <template #append>
            <div>
              <template v-if="isActive">
                Active
              </template>
              <template v-else>
                Paused
              </template>
            </div>
          </template>
        </p-toggle>
      </p-label>

      <p-label label="Flow Run Concurrency (Optional)">
        <p-number-input v-model="concurrencyLimit" placeholder="Unlimited" :min="0" />
      </p-label>
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <SubmitButton action="Create" :loading="isSubmitting" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTextInput, PNumberInput, PToggle, PForm } from '@prefecthq/prefect-design'
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import SubmitButton from '@/components/SubmitButton.vue'
  import { useForm } from '@/compositions/useForm'
  import { WorkQueueCreate } from '@/models'
  import { isRequired } from '@/utilities/validation'

  const { handleSubmit, isSubmitting, errors } = useForm<WorkQueueCreate>()

  const rules = {
    name: isRequired('Name'),
  }

  const isActive = computed({
    get() {
      return !isPaused.value
    },
    set() {
      isPaused.value = !isPaused.value
    },
  })

  const { value: name, meta: nameState } = useField<string>('name', rules.name)
  const { value: description } = useField<string|null>('description')
  const { value: isPaused } = useField<boolean | undefined>('isPaused')
  const { value: concurrencyLimit } = useField<number|null>('concurrencyLimit')

  const emit = defineEmits<{
    (event: 'submit', value: WorkQueueCreate): void,
    (event: 'cancel'): void,
  }>()

  const submit = handleSubmit((values) => {
    emit('submit', values)
  })

  function cancel(): void {
    emit('cancel')
  }
</script>

<style>
.work-queue-create-form { @apply
  border
  dark:border-background-600
  px-6
  py-6
  rounded-lg
}

.work-queue-create-form__section-header { @apply
  text-base
  text-foreground-300
}
</style>