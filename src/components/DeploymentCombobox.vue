<template>
  <p-combobox v-model="selected" v-model:search="search" :options="options" manual @bottom="loadMore">
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
  import { PCombobox, SelectOptionNormalized } from '@prefecthq/prefect-design'
  import { computed, onMounted, ref } from 'vue'
  import { DeploymentComboboxOption } from '@/components'
  import { useDeploymentsInfiniteScroll } from '@/compositions/useDeploymentsInfiniteScroll'

  type DeploymentOption = SelectOptionNormalized & { flowId?: string }

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    allowUnset?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const search = ref()

  const selected = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emits('update:selected', value)
    },
  })

  const { deployments, loadMore } = useDeploymentsInfiniteScroll(() => ({
    deployments: {
      nameLike: search.value,
    },
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

  onMounted(() => loadMore())
</script>