<template>
  <p-modal v-model:showModal="internalValue">
    <template #title>
      <div class="state-change-modal__title">
        <slot name="title">
          {{ `Change ${label} State` }}
        </slot>
      </div>
    </template>

    <p-form @submit="submit">
      <p-content>
        <p-label :label="`Current ${label} State`">
          <StateBadge :state="run.state" />
        </p-label>
        <p-label :label="`Desired ${label} State`" :message="stateErrorMessage" :state="typeState">
          <StateSelect v-model:selected="type" terminal-state />
        </p-label>
        <p-label label="Reason (Optional)">
          <p-text-input v-model="message" />
        </p-label>
      </p-content>
    </p-form>

    <template #actions>
      <slot name="actions">
        <p-button primary class="state-change-modal__state-change-button" :loading="isSubmitting" @click="submit">
          Change
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>


<script lang="ts" setup>
  import { useField } from 'vee-validate'
  import { computed, watch } from 'vue'
  import StateBadge from '@/components/StateBadge.vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { useForm } from '@/compositions'
  import { FlowRun, StateUpdateDetails, TaskRun } from '@/models'
  import { isRequired } from '@/utilities/validation'


  const props = withDefaults(defineProps<{
    showModal: boolean,
    label?: string,
    run: FlowRun | TaskRun,
  }>(), {
    label: '',
  })

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'change', value: StateUpdateDetails): void,
  }>()

  const internalValue = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  const rules = {
    type: [isRequired('State')],
  }

  const { handleSubmit, handleReset, isSubmitting } = useForm<StateUpdateDetails>()
  const { value: type, meta: typeState, errorMessage: stateErrorMessage } = useField<string>('type', rules.type)
  const { value: message } = useField<string>('message')

  const submit = handleSubmit(values => {
    emit('change', values)
    internalValue.value = false
  })

  watch(internalValue, value => {
    if (!value) {
      handleReset()
    }
  })
</script>

<style>
.change-state-modal__title { @apply
  capitalize
}
</style>
