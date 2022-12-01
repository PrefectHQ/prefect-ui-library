<template>
  <p-combobox v-model="internalValue" :options="options" :empty-message="emptyMessage">
    <template #combobox-options-empty>
      No deployments
    </template>
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
    <template #option="{ option }: { option: DeploymentOption }">
      <slot name="option" :option="option">
        <template v-if="option.flowId">
          <deployment-combobox-option :flow-id="option.flowId" :deployment-name="option.label" />
        </template>
      </slot>
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { DeploymentComboboxOption } from '@/components'
  import { useWorkspaceApi } from '@/compositions'

  type DeploymentOption = SelectOption & { flowId?: string }

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
    allowUnset?: boolean,
  }>()

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

  const options = computed<DeploymentOption[]>(() => {
    const options: DeploymentOption[] = deployments.value.map(deployment => ({
      value: deployment.id,
      label: deployment.name,
      flowId: deployment.flowId,
    }))

    if (props.allowUnset) {
      options.unshift({
        label: 'None',
        value: null,
      })
    }

    return options
  })
</script>