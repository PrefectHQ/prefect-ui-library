<template>
  <p-combobox v-model="selected" v-model:search="search" :options="options" manual @bottom="next">
    <template #combobox-options-empty>
      No deployments
    </template>
    <template #default="scope">
      <slot v-bind="scope">
        <UseDeploymentSlot v-if="isString(scope.value)" :deployment-id="scope.value">
          <template #default="{ deployment }">
            <DeploymentComboboxOption :flow-id="deployment.flowId" :deployment-name="deployment.name" />
          </template>
        </UseDeploymentSlot>
      </slot>
    </template>
    <template #option="{ option }: { option: DeploymentOption }">
      <slot name="option" :option="option">
        <template v-if="option.flowId">
          <DeploymentComboboxOption :flow-id="option.flowId" :deployment-name="option.label" />
        </template>
      </slot>
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { DeploymentComboboxOption } from '@/components'
  import UseDeploymentSlot from '@/components/UseDeploymentSlot.vue'
  import { useDeployments } from '@/compositions/useDeployments'
  import { DeploymentsFilter } from '@/models/Filters'
  import { isString } from '@/utilities/strings'

  type DeploymentOption = { label: string, value: string | null, flowId?: string }

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    allowUnset?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const search = ref('')
  const searchDebounced = useDebouncedRef(search, 500)

  const selected = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emit('update:selected', value)
    },
  })

  const filter = (): DeploymentsFilter => ({
    deployments: {
      nameLike: searchDebounced.value,
    },
    limit: 20,
  })

  const { deployments, next } = useDeployments(filter, { mode: 'infinite' })

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