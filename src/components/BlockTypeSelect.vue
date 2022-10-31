<template>
  <PSelect v-model="model" :options="options" class="block-type-select">
    <template #default="{ selectedOption }">
      Type: {{ selectedOption.label }}
    </template>
  </PSelect>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    selected: string | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const model = computed({
    get() {
      return props.selected
    },
    set(value: string | null) {
      emit('update:selected', value)
    },
  })

  const api = useWorkspaceApi()
  const blockTypesSubscription = useSubscription(api.blockTypes.getBlockTypes)
  const blockTypes = computed(() => blockTypesSubscription.response ?? [])

  const options = computed(() => {
    const allOption = { label: 'all', value: null }
    const capabilityOptions = blockTypes.value.map(({ name }) => ({
      label: name,
      value: name,
    }))

    return [allOption, ...capabilityOptions]
  })
</script>