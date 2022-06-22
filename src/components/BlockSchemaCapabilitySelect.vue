<template>
  <PSelect v-model="model" :options="options" class="block-schema-capability-select">
    <template #default="{ selectedOption }">
      Capability: {{ selectedOption.label }}
    </template>
  </PSelect>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { blockSchemaCapabilities, BlockSchemaCapability } from '@/models'
  import { capitalize } from '@/utilities'

  const props = defineProps<{
    selected: BlockSchemaCapability | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: BlockSchemaCapability | null): void,
  }>()

  const model = computed({
    get() {
      return props.selected
    },
    set(value: BlockSchemaCapability | null) {
      emit('update:selected', value)
    },
  })

  const options = computed(() => {
    const allOption = { label: 'All', value: null }
    const capabilityOptions = blockSchemaCapabilities.map(capability => ({
      label: capitalize(capability),
      value: capability,
    }))

    return [allOption, ...capabilityOptions]
  })
</script>