<template>
  <p-toggle v-model="value" :state="state" />
</template>

<script lang="ts" setup>
  import { State, isDefined } from '@prefecthq/prefect-design'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { asType } from '@/utilities/types'

  const props = defineProps<{
    property: SchemaProperty & { type: 'boolean' },
    state: State,
  }>()

  const value = defineModel<boolean | undefined>({ default: undefined })

  if (!isDefined(value.value)) {
    const valueOrDefaultValue = isDefined(value.value) ? value.value : asType(props.property.default, Boolean)

    value.value = valueOrDefaultValue
  }
</script>