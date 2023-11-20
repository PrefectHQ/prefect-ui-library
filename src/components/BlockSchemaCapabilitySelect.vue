<template>
  <p-combobox v-model="model" :options="options" empty-message="Block capability" class="block-schema-capability-combobox">
    <template #default="{ label }">
      Capability: {{ label }}
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    allowUnset?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emit('update:selected', value)
    },
  })

  const api = useWorkspaceApi()
  const blockCapabilitiesSubscription = useSubscription(api.blockCapabilities.getBlockCapabilities)
  const blockCapabilities = computed(() => blockCapabilitiesSubscription.response ?? [])
  const blockCapabilitiesSorted = computed(() => blockCapabilities.value.slice().sort((alpha, beta) => alpha.localeCompare(beta)))

  const options = computed<SelectOption[]>(() => {
    const options: SelectOption[] = blockCapabilitiesSorted.value.map(capability => ({
      value: capability,
      label: capability,
    }))

    if (props.allowUnset) {
      options.unshift({
        value: null,
        label: 'None',
      })
    }

    return options
  })
</script>