<template>
  <div class="deployment-combobox">
    <p-combobox v-model="internalValue" :options="options" :empty-message="emptyMessage" />
  </div>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    selectedDeploymentId: string | string[] | null | undefined,
    emptyMessage?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:selectedDeploymentId', value: string | string[] | null): void,
  }>()

  const multiple = computed(() => Array.isArray(props.selectedDeploymentId))

  const internalValue = computed({
    get() {
      return props.selectedDeploymentId ?? null
    },
    set(value: string | string[] | null) {
      console.log({ value })
      if (!value) {
        emits('update:selectedDeploymentId', null)
      } else if (multiple.value) {
        emits('update:selectedDeploymentId', Array.isArray(value) ? value : [value])
      } else {
        emits('update:selectedDeploymentId', value)
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