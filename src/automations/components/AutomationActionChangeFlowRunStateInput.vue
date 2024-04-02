<template>
  <p-content class="automation-action-change-flow-run-state-input">
    <p-label label="State">
      <p-select v-model="state" :options="stateOptions" />
    </p-label>

    <p-label label="Name">
      <p-text-input v-model="name" :placeholder="namePlaceholder" />
    </p-label>

    <p-label label="Message">
      <p-textarea v-model="message" placeholder="State changed by Automation <id>" />
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { AutomationActionChangeFlowRunState } from '@/automations/types/actions'
  import { stateType } from '@/models/StateType'
  import { capitalize } from '@/utilities/strings'

  const props = defineProps<{
    action: Partial<AutomationActionChangeFlowRunState>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionChangeFlowRunState>): void,
  }>()

  const stateOptions = computed<SelectOption[]>(() => {
    return stateType.map((state) => ({
      label: capitalize(state),
      value: state.toUpperCase(),
    }))
  })

  const state = computed({
    get() {
      return props.action.state
    },
    set(state) {
      emit('update:action', { ...props.action, state })
    },
  })

  const name = computed({
    get() {
      return props.action.name ?? ''
    },
    set(name) {
      emit('update:action', { ...props.action, name })
    },
  })

  const namePlaceholder = computed(() => {
    const value = state.value ?? ''

    return capitalize(value.toLowerCase())
  })

  const message = computed({
    get() {
      return props.action.message ?? ''
    },
    set(message) {
      emit('update:action', { ...props.action, message })
    },
  })
</script>
