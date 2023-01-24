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
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import { useFlowRunsFilterFromRoute, useWorkspaceApi } from '@/compositions'
  import { useForm } from '@/compositions/useForm'
  import { localization } from '@/localization'
  import { SavedSearch } from '@/models/SavedSearch'
  import { isRequired, withMessage, isValidIf } from '@/utilities/validation'

  const props = defineProps<{
    showModal: boolean,
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

  const api = useWorkspaceApi()
  const { filter } = useFlowRunsFilterFromRoute()
  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)
  const savedSearches = computed(() => savedSearchesSubscription.response ?? [])

  const nameDoesNotExist = isValidIf(value => !savedSearches.value.some(({ name }) => name === value))

  const rules = [isRequired('Name'), withMessage(nameDoesNotExist, 'Name must be unique')]
  const { value: filterName, meta: filterNameState, errorMessage: filterErrorMessage } = useField<string>('filterName', rules)

  const submit = handleSubmit(({ filterName }) => {
    saveFilter(filterName)
    handleReset()
  })

  const saveFilter = async (filterName: string): Promise<void> => {
    try {
      const { state, tags, name: flowName } = filter.flowRuns ?? {}
      const { name: deploymentName } = filter.deployments ?? {}

      const savedSearch = await api.savedSearches.createSavedSearch({
        name: filterName,
        filters: {
          state: state?.name,
          tag: tags?.name,
          flow: flowName,
          deployment: deploymentName,
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

