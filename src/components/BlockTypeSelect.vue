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
  import { blockTypesApiKey } from '@/services'
  import { inject } from '@/utilities'

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

  const blockTypesApi = inject(blockTypesApiKey)
  const blockTypesSubscription = useSubscription(blockTypesApi.getBlockTypes)
  const blockTypes = computed(() => blockTypesSubscription.response ?? [])

  const options = computed(() => {
    const allOption = { label: 'All', value: null }
    const capabilityOptions = blockTypes.value.map(({ name }) => ({
      label: name,
      value: name,
    }))

    return [allOption, ...capabilityOptions]
  })
</script>