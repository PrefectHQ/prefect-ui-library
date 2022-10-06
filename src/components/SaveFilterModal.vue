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
  import { useField, useForm } from 'vee-validate'
  import { computed } from 'vue'
  import { isRequired, withMessage, isValidIf } from '@/utilities/validation'

  const props = defineProps<{
    showModal: boolean,
    filterNames: string[],
  }>()

  const { handleSubmit, handleReset, isSubmitting } = useForm<{
    filterName: string,
  }>()

  const nameDoesNotExist = isValidIf(value => !value || !props.filterNames.includes(value as string))

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

