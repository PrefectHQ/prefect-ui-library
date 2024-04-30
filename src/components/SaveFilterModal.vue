<template>
  <p-modal v-model:showModal="internalShowModal" class="save-filter-modal" title="Save View">
    <p-form @submit="submit">
      <p-content>
        <p-label label="View Name" :state="filterNameState" :message="filterErrorMessage">
          <p-text-input v-model="filterName" />
        </p-label>
      </p-content>
    </p-form>

    <template #actions>
      <slot name="actions">
        <p-button variant="default" :loading="isSubmitting" @click="submit">
          Save
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import { useForm } from '@/compositions/useForm'
  import { SavedFlowRunsSearch, useSavedFlowRunsSearches } from '@/compositions/useSavedFlowRunsSearches'
  import { localization } from '@/localization'
  import { SavedSearch } from '@/models/SavedSearch'
  import { getApiErrorMessage } from '@/utilities/errors'
  import { isRequired, withMessage, isValidIf } from '@/utilities/validation'

  const props = defineProps<{
    showModal: boolean,
    savedSearch: SavedFlowRunsSearch,
  }>()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'saved', value: SavedSearch): void,
  }>()

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  const { handleSubmit, handleReset, isSubmitting } = useForm<{
    filterName: string,
  }>()

  const { savedFlowRunsSearches, createSavedFlowRunsSearch } = useSavedFlowRunsSearches()

  const nameDoesNotExist = isValidIf(value => !savedFlowRunsSearches.value.some(({ name }) => name === value))

  const rules = [isRequired('Name'), withMessage(nameDoesNotExist, 'Name must be unique')]
  const { value: filterName, meta: filterNameState, errorMessage: filterErrorMessage } = useField<string>('filterName', rules)

  const submit = handleSubmit(({ filterName }) => {
    saveFilter(filterName)
    handleReset()
  })

  const saveFilter = async (filterName: string): Promise<void> => {
    try {
      const savedSearch = await createSavedFlowRunsSearch({
        name: filterName,
        filters: props.savedSearch.filters,
      })

      showToast(localization.success.createSavedSearch, 'success')
      internalShowModal.value = false
      emit('saved', savedSearch)
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.createSavedSearch)
      showToast(message, 'error')
    }
  }
</script>
