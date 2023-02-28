<template>
  <PSelect v-model="model" class="block-type-select" v-bind="{ options, disabled }">
    <template #default="{ label }">
      {{ label }}
    </template>
  </PSelect>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { titleCase } from '@/utilities'

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
  const workersCollectionSubscription = useSubscription(api.collections.getWorkerCollection, [])
  const workersCollectionItems = computed(() => workersCollectionSubscription.response ?? [])

  const options = computed<SelectOption[]>(() => {
    const options: { label: string, value: string }[] = workersCollectionItems.value.map(({ type }) => ({
      label: titleCase(type!),
      value: type!,
    }))

    return options
  })
</script>