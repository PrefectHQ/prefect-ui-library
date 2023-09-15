<template>
  <p-combobox v-model="selected" v-model:search="search" :options="options" manual @bottom="more">
    <template #combobox-options-empty>
      No deployments
    </template>
    <template #default="scope">
      <slot v-bind="scope">
        <UseDeploymentSlot v-if="isString(scope.value)" :deployment-id="scope.value">
          <template #default="{ deployment }">
            {{ deployment.name }}
          </template>
        </UseDeploymentSlot>
      </slot>
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
  import { PCombobox } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { DeploymentComboboxOption } from '@/components'
  import UseDeploymentSlot from '@/components/UseDeploymentSlot.vue'
  import { useDeploymentsInfiniteScroll } from '@/compositions/useDeploymentsInfiniteScroll'
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

  const { deployments, more } = useDeploymentsInfiniteScroll(() => ({
    deployments: {
      nameLike: searchDebounced.value,
    },
    limit: 50,
  }))

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