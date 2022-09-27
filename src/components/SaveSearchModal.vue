<template>
  <slot :open="open" :close="close" :toggle="toggle" />
  <p-modal v-model:showModal="showModal" title="Save Filter">
    <p-form @submit="submit">
      <p-content>
        <p-label label="Filter Name" :state="filterNameState" :message="errors.filterName">
          <p-text-input v-model="filterName" />
        </p-label>
      </p-content>
    </p-form>


    <template #actions>
      <p-button :loading="isSubmitting" @click="submit">
        Save
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { isRequired, useShowModal, withMessage } from '@prefecthq/orion-design'
  import { useField, useForm } from 'vee-validate'
  import { watch } from 'vue'

  const { showModal, open, close, toggle } = useShowModal()

  const { handleSubmit, handleReset, isSubmitting, errors } = useForm<{
    filterName: string,
  }>()
  const rules = {
    filterName: [withMessage(isRequired, 'Name is is required')],
  }
  const { value: filterName, meta: filterNameState } = useField<string>('filterName', rules.filterName, { initialValue: '' })

  const emit = defineEmits<{
    (event: 'save', filterName: string): void,
  }>()

  const submit = handleSubmit(({ filterName }) => {
    emit('save', filterName)
  })

  watch(showModal, value => {
    if (!value) {
      handleReset()
    }
  })
</script>

