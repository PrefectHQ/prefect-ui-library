<template>
  <p-modal v-model:showModal="internalValue" class="save-filter-modal" title="Save Filter">
    <p-form @submit="submit">
      <p-content>
        <p-label label="Filter Name" :state="filterNameState" :message="errors.filterName">
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
  import { withMessage, isRequired } from '@/services'

  const props = defineProps<{
    showModal: boolean,
  }>()

  const { handleSubmit, handleReset, isSubmitting, errors } = useForm<{
    filterName: string,
  }>()

  const rules = {
    filterName: [withMessage(isRequired, 'Name is is required')],
  }

  const { value: filterName, meta: filterNameState } = useField<string>('filterName', rules.filterName, { initialValue: '' })

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'save', filterName: string): void,
  }>()

  const internalValue = computed({
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
  .save-filter-modal__date-filter-warning {
    @apply text-sm
  }
</style>

