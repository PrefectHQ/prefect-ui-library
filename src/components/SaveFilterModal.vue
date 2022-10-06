<template>
  <p-modal v-model:showModal="internalShowModal" class="save-filter-modal" title="Save View">
    <p-form @submit="submit">
      <p-content>
        <p-label label="View Name" :state="filterNameState" :message="filterErrorMessage">
          <p-text-input v-model="filterName" />
        </p-label>
        <span class="save-filter-modal__date-filter-warning"> All saved filters currently use the default time period of 7 days.</span>
      </p-content>
    </p-form>

    <template #actions>
      <slot name="actions">
        <p-button :loading="isSubmitting" @click="submit">
          Save
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { useField, useForm } from 'vee-validate'
  import { computed } from 'vue'
  import { workspaceApiKey } from '@/utilities'
  import { inject } from '@/utilities/inject'
  import { isRequired, withMessage, isValidIf } from '@/utilities/validation'

  const api = inject(workspaceApiKey)
  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)
  const savedSearches = computed(()=> savedSearchesSubscription.response ?? [])

  const props = defineProps<{
    showModal: boolean,
  }>()

  const { handleSubmit, handleReset, isSubmitting } = useForm<{
    filterName: string,
  }>()

  const filterNames = savedSearches.value.map(search => search.name)

  const nameDoesNotExist = isValidIf(value => !value || !filterNames.includes(value as string))
  const { value: filterName, meta: filterNameState, errorMessage: filterErrorMessage } = useField<string>('filterName', [withMessage(nameDoesNotExist, 'Name must be unique'), isRequired('Name')])

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'save', filterName: string): void,
  }>()

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  const submit = handleSubmit(({ filterName }) => {
    emit('save', filterName)
    handleReset()
  })
</script>

<style>
  .save-filter-modal__date-filter-warning { @apply
    text-sm
    font-semibold
  }
</style>

