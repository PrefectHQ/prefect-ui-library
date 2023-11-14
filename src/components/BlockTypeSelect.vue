<template>
  <p-combobox v-model="model" :options="options" empty-message="Block type" class="block-type-combobox">
    <template #default="{ label }">
      Type: {{ label }}
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
  const blockTypesSubscription = useSubscription(api.blockTypes.getBlockTypes)
  const blockTypes = computed(() => blockTypesSubscription.response ?? [])

  const options = computed<SelectOption[]>(() => {
    const options: SelectOption[] = blockTypes.value.map(type => ({
      value: type.slug,
      label: type.name,
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