<template>
  <p-content class="schema-view">
    <slot :kind />

    <component :is="view.component" v-bind="view.props" />
  </p-content>
</template>

<script lang="ts" setup>
  import { VNode, computed, provide } from 'vue'
  import { useSchemaPropertyView } from '@/schemas/compositions/useSchemaPropertyView'
  import { schemaViewSettingsInjectionKey } from '@/schemas/compositions/useSchemaViewSettings'
  import { Schema } from '@/schemas/types/schema'
  import { PrefectKind, SchemaValues, getPrefectKindFromValue } from '@/schemas/types/schemaValues'

  const { schema, values, kinds } = defineProps<{
    schema: Schema,
    values: SchemaValues | undefined,
    kinds: PrefectKind[],
  }>()

  provide(schemaViewSettingsInjectionKey, {
    schema,
    kinds,
  })

  defineSlots<{
    default: (props: { kind: PrefectKind }) => VNode,
  }>()

  const { view } = useSchemaPropertyView(() => schema, () => values)
  const kind = computed(() => getPrefectKindFromValue(() => values))
</script>