<template>
  <p-key-value v-if="variable">
    <template #key>
      {{ value.variable_name }}
    </template>
    <template #value>
      {{ variable }}
    </template>
  </p-key-value>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { PrefectKindWorkspaceVariable } from '@/schemas/types/schemaValues'

  const { value } = defineProps<{
    value: PrefectKindWorkspaceVariable,
  }>()

  const api = useWorkspaceApi()

  const variableNameRef = computed<[string] | null>(() => value.variable_name ? [value.variable_name] : null)
  const variableSubscription = useSubscriptionWithDependencies(api.variables.getVariableByName, variableNameRef)
  const variable = computed(() => variableSubscription.response ?? [])
</script>