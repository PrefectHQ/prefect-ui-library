<template>
  <PSelect v-model="model" class="block-type-select" v-bind="{ options, disabled }">
    <template #default="{ label }">
      {{ label }}
    </template>
  </PSelect>
</template>

<script lang="ts" setup>
  import { SelectOptionNormalized } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { getProcessTypeLabel } from '@/utilities'

  const props = defineProps<{
    selected: string | null | undefined,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? null
    },
    set(value: string | null) {
      emit('update:selected', value)
    },
  })

  const api = useWorkspaceApi()
  const workersSubscription = useSubscription(api.collections.getWorkerCollectionWorkers, [])
  const workers = computed(() => workersSubscription.response ?? [])

  const options = computed<SelectOptionNormalized[]>(() => {
    const options: SelectOptionNormalized[] = workers.value.map(({ type }) => ({
      label: getProcessTypeLabel(type!),
      value: type!,
    }))

    return options.sort((optionA, optionB) => optionA.label.localeCompare(optionB.label))
  })
</script>