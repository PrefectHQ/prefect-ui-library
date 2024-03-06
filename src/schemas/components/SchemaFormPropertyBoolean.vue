<template>
  <p-toggle v-model="value" :state="state" />
</template>

<script lang="ts" setup>
  import { State, isDefined } from '@prefecthq/prefect-design'
  import { SchemaProperty } from '@/schemas/types/schema'

  defineProps<{
    // eslint-disable-next-line vue/no-unused-properties
    property: SchemaProperty & { type: 'boolean' },
    state: State,
  }>()

  const value = defineModel<boolean | undefined>({ default: undefined })

  if (!isDefined(value.value)) {
    value.value = false
  }
</script>