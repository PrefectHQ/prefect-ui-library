<template>
  <p-content>
    <p-label label="Name" :message="error" :state="state">
      <template #default="{ id }">
        <p-text-input :id="id" v-model="name" :state="state" />
      </template>
    </p-label>

    <p-label label="Description (Optional)">
      <template #default="{ id }">
        <p-textarea :id="id" v-model="description" rows="7" />
      </template>
    </p-label>

    <p-label label="Flow Run Concurrency (Optional)">
      <template #default="{ id }">
        <p-number-input :id="id" v-model="concurrencyLimit" placeholder="Unlimited" :min="0" />
      </template>
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { useWizardStep } from '@prefecthq/prefect-design'
  import { usePatchRef, useValidation, useValidationObserver } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { WorkPoolFormValues } from '@/models/WorkPool'

  const props = defineProps<{
    workPool: WorkPoolFormValues,
  }>()

  const emit = defineEmits<{
    (event: 'update:workPool', value: WorkPoolFormValues): void,
  }>()

  const workPool = computed({
    get() {
      return props.workPool
    },
    set(value) {
      emit('update:workPool', value)
    },
  })

  const name = usePatchRef(workPool, 'name')
  const description = usePatchRef(workPool, 'description')
  const concurrencyLimit = usePatchRef(workPool, 'concurrencyLimit')

  const { defineValidate } = useWizardStep()
  const { validate } = useValidationObserver()
  const { state, error } = useValidation(name, 'Work pool name', value => {
    if (value?.toLowerCase().startsWith('prefect')) {
      return 'Work pools starting with "prefect" are reserved for internal use.'
    }

    if (value) {
      return true
    }

    return 'Name is required'
  })


  defineValidate(validate)
</script>