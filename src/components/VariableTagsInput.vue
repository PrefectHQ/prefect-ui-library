<template>
  <p-tags-input
    v-model="internalValue"
    :placeholder="localization.info.addTagPlaceholder"
    :options="options"
    :empty-message="localization.info.all"
  />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useVariables } from '@/compositions'
  import { localization } from '@/localization'
  import { VariablesFilter } from '@/models/Filters'

  const props = defineProps<{
    selected: string[] | null | undefined,
    filter?: VariablesFilter,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string[] | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emits('update:selected', value)
    },
  })

  const filter = computed<VariablesFilter>(() => {
    return {
      ...props.filter,
    }
  })

  const { variables } = useVariables(filter)
  const tagList = computed(() => variables.value?.flatMap(variable => variable.tags))
  const options = computed(() => [...new Set(tagList.value)])
</script>