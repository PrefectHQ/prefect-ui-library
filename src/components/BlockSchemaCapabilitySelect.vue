<template>
  <PSelect v-model="model" :options="options" class="block-schema-capability-select">
    <template #default="{ selectedOption }">
      Capability: {{ selectedOption.label }}
    </template>
  </PSelect>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { blockCapabilitiesApiKey } from '@/services/BlockCapabilitiesApi'
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

  const blockCapabilitiesApi = inject(blockCapabilitiesApiKey)
  const blockCapabilitiesSubscription = useSubscription(blockCapabilitiesApi.getBlockCapabilities)
  const blockCapabilities = computed(() => blockCapabilitiesSubscription.response ?? [])

  const options = computed(() => {
    const allOption = { label: 'All', value: null }

    return [allOption, ...blockCapabilities.value]
  })
</script>