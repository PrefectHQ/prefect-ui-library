<template>
  <p-combobox
    v-model="selected"
    v-model:search="search"
    class="workspace-variable-combobox"
    :options="options"
    manual
    @bottom="next"
  />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { useVariables } from '@/compositions/useVariables'
  import { VariablesFilter } from '@/models/Filters'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    allowUnset?: boolean,
  }>()

  const emit = defineEmits<{
    'update:selected': [string | string[] | null],
  }>()

  const selected = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emit('update:selected', value)
    },
  })

  const search = ref('')
  const searchDebounced = useDebouncedRef(search, 500)

  const filter = (): VariablesFilter => ({
    variables: {
      nameLike: searchDebounced.value,
    },
    limit: 20,
  })

  const { variables, next } = useVariables(filter, { mode: 'infinite' })

  const options = computed<SelectOption[]>(() => {
    const options: SelectOption[] = variables.value.map(variable => ({
      value: variable.name,
      label: variable.name,
    }))

    if (props.allowUnset) {
      options.unshift({
        label: 'None',
        value: null,
      })
    }

    return options
  })
</script>