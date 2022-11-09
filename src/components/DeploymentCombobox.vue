<template>
  <p-combobox v-model="internalValue" :options="options" :empty-message="emptyMessage">
    <template #combobox-options-empty>
      No deployments
    </template>
    <template #option="{ option }">
      <deployments-p-combo-box-option :flow-id="option.flowId" :deployment-name="option.label" />
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { DeploymentsPComboBoxOption } from '@/components'
  import { useWorkspaceApi } from '@/compositions'

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

  const api = useWorkspaceApi()
  const deploymentsSubscription = useSubscription(api.deployments.getDeployments, [{}])
  const deployments = computed(() => deploymentsSubscription.response ?? [])

  const options = computed<SelectOption[]>(() => deployments.value.map((deployment: any) => ({
    value: deployment.id,
    label: deployment.name,
    flowId: deployment.flowId,
  })))

  // const visible = ref(false)
  // const deploymentOptionEl = ref<HTMLDivElement>()

  // function intersect(entries: IntersectionObserverEntry[]): void {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       visible.value = true
  //       disconnect()
  //     }
  //   })
  // }

  // const { observe, disconnect } = useIntersectionObserver(intersect)

  // onMounted(() => {
  //   observe(deploymentOptionEl)
  // })
</script>