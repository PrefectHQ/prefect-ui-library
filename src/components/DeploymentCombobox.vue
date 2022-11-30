<template>
  <p-combobox v-model="internalValue" :options="options" :empty-message="emptyMessage">
    <template #combobox-options-empty>
      No deployments
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, withDefaults } from 'vue'
  import { useWorkspaceApi } from '@/compositions'

  const props = withDefaults(defineProps<{
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
    additionalOptions?: SelectOption[],
  }>(), {
    emptyMessage: 'No deployments',
    additionalOptions: () => [],
  })

  const emits = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const multiple = computed(() => Array.isArray(props.selected))

  const internalValue = computed({
    get() {
      return props.selected ?? null
    },
    set(value: string | string[] | null) {
      if (!value) {
        emits('update:selected', null)
      } else if (multiple.value) {
        emits('update:selected', Array.isArray(value) ? value : [value])
      } else {
        emits('update:selected', value)
      }
    },
  })

  const api = useWorkspaceApi()
  const deploymentsSubscription = useSubscription(api.deployments.getDeployments, [{}])
  const deployments = computed(() => deploymentsSubscription.response ?? [])
  const options = computed<SelectOption[]>(() => {
    return [
      ...props.additionalOptions,
      ...deployments.value.map(deployment => ({
        value: deployment.id,
        label: deployment.name,
      })),
    ]
  })
</script>