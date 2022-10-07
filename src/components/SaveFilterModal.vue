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
  import { showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { useField, useForm } from 'vee-validate'
  import { computed } from 'vue'
  import { useFlowRunFilterFromRoute } from '@/compositions/useFlowRunFilterFromRoute'
  import { localization } from '@/localization'
  import { SearchOption } from '@/models/SavedSearch'
  import { workspaceApiKey } from '@/utilities/api'
  import { inject } from '@/utilities/inject'
  import { systemSavedSearches, customSavedSearch } from '@/utilities/savedFilters'
  import { isRequired, withMessage, isValidIf } from '@/utilities/validation'

  const props = defineProps<{
    showModal: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'saved', value: SearchOption): void,
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

  const api = inject(workspaceApiKey)
  const { flows, states, tags, deployments } = useFlowRunFilterFromRoute()

  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)
  const savedSearches = computed(()=> savedSearchesSubscription.response ?? [])
  const allSearchOptions = computed(() => [...systemSavedSearches, ...savedSearches.value])

  const nameDoesNotExist = isValidIf(value => !allSearchOptions.value.some(({ name }) => name === value))

  const rules = [isRequired('Name'), withMessage(nameDoesNotExist, 'Name must be unique')]
  const { value: filterName, meta: filterNameState, errorMessage: filterErrorMessage } = useField<string>('filterName', rules)

  const submit = handleSubmit(({ filterName }) => {
    saveFilter(filterName)
    handleReset()
  })

  const saveFilter = async (filterName: string): Promise<void> => {
    try {
      const savedSearch = await api.savedSearches.createSavedSearch({
        name: filterName,
        filters: {
          state: states.value,
          tag: tags.value,
          flow: flows.value,
          deployment: deployments.value,
        },
      })
      savedSearchesSubscription.refresh()
      showToast(localization.success.createSavedSearch, 'success')
      internalShowModal.value = false
      emit('saved', savedSearch)
    } catch (error) {
      console.error(error)
      showToast(localization.error.createSavedSearch, 'error')
    }
  }
</script>

<style>
.save-filter-modal__date-filter-warning { @apply
  text-sm
  font-semibold
}
</style>

