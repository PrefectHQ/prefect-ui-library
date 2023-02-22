<template>
  <PSelect v-model="model" :options="options" class="block-type-select">
    <template #default="{ label }">
      {{ label }}
    </template>
  </PSelect>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
import { titleCase } from '@/utilities';
import { useWorkspaceApi } from '@/compositions';
import { useSubscription } from '@prefecthq/vue-compositions';

  const props = defineProps<{
    selected: string | null | undefined,
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
    const options: { label: string, value: any }[] = workersCollectionItems.value.map(({type}) => ({
      label: titleCase(type!),
      value: type,
    }))

    return options
  })
</script>