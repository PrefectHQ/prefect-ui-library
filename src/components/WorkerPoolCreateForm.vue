<template>
  <p-form class="worker-pool-create-form" @submit="submit">
    <p-content>
      <p-label label="Name " :message="nameErrorMessage" :state="nameState">
        <p-text-input v-model="name" :state="nameState" />
      </p-label>

      <p-label label="Description (Optional)">
        <p-textarea v-model="description" rows="7" />
      </p-label>

      <p-label label="Type" :state="typeState" :message="typeErrorMessage">
        <p-text-input v-model="type" :state="typeState" />

        <!-- <WorkerPoolTypeSelect v-model:type="type" :state="typeState" /> -->
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
      <SubmitButton action="Create" :loading="pending" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useValidation, useValidationObserver, ValidationRule } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { SubmitButton } from '@/components'
  import { WorkerPoolCreate } from '@/models'

  const emit = defineEmits<{
    (event: 'submit', value: WorkerPoolCreate): void,
    (event: 'cancel'): void,
  }>()

  const name = ref()
  const description = ref()
  const type = ref()
  const isPaused = ref(true)
  const concurrencyLimit = ref()
  const { validate, pending } = useValidationObserver()

  const isActive = computed({
    get() {
      return !isPaused.value
    },
    set() {
      isPaused.value = !isPaused.value
    },
  })

  const isRequired: ValidationRule<string> = (value) => value.length > 0

  const rules: Record<string, ValidationRule<string>[]> = {
    name: [isRequired],
    type: [isRequired],
  }

  const { error: nameErrorMessage, state: nameState } = useValidation(name, 'Name', rules.name)
  const { error: typeErrorMessage, state: typeState } = useValidation(type, 'Type', rules.type)

  function cancel(): void {
    emit('cancel')
  }
  const submit = async (): Promise<void> => {
    const valid = await validate()
    if (valid) {
      emit('submit', { name: name.value, description: description.value, type: type.value, isPaused: isPaused.value, concurrencyLimit: concurrencyLimit.value })
      cancel()
    }
  }
</script>

<style>
.worker-pool-create-form {
@apply
  border-[1px]
  border-gray-300
  px-6
  py-6
  rounded-lg
}
</style>