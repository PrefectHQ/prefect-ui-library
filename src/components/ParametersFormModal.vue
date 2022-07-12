<template>
  <slot :open="open" :close="close" />
  <p-modal v-model:showModal="showModal" class="parameters-form-modal" title="Edit parameters">
    <p-label label="Mode">
      <p-button-group v-model="parametersForm" :options="parameterFormOptions" size="sm" />
    </p-label>

    <template v-if="parametersForm == 'default'">
      <p>
        Coming soon
      </p>
    </template>

    <template v-else-if="parametersForm == 'json'">
      <JsonEditor v-model="stringValue" />
    </template>

    <template #actions>
      <p-button type="submit" @click="submit">
        Save
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, reactive, ref } from 'vue'
  import JsonEditor from './JsonEditor.vue'
  import { useShowModal } from '@/compositions'
  const { showModal, open, close } = useShowModal()
  type Parameters = Record<string, unknown>
  const props = defineProps<{
    parameters?: Parameters,
  }>()
  const emit = defineEmits<{
    (event: 'submit', value: Parameters): void,
  }>()
  let parameters = reactive(props.parameters ?? {})
  const stringValue = computed({
    get() {
      return JSON.stringify(parameters)
    },
    set(val) {
      try {
        parameters = JSON.parse(val)
      } catch {
      // Do nothing
      }
    },
  })
  const parametersForm = ref('json')
  const parameterFormOptions: ButtonGroupOption[] = [{ label: 'Default', value: 'default' }, { label: 'JSON', value: 'json' }]
  const submit = (): void => {
    emit('submit', parameters)
    close()
  }
</script>