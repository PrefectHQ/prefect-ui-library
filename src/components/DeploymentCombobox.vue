<template>
  <p-combobox v-model="internalValue" :options="options" :empty-message="emptyMessage">
    <template #options-empty>
      <span class="deployment-combobox__options-empty">No deployments</span>
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
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

  const deploymentsApi = inject(deploymentsApiKey)
  const deploymentsSubscription = useSubscription(deploymentsApi.getDeployments, [{}])
  const deployments = computed(() => deploymentsSubscription.response ?? [])
  const options = computed<SelectOption[]>(() => deployments.value.map(deployment => ({
    value: deployment.id,
    label: deployment.name,
  })))
</script>

<style>
.deployment-combobox__options-empty {
  @apply
  flex
  justify-between
  items-center
  text-gray-700
  text-sm italic
  p-2
}
</style>