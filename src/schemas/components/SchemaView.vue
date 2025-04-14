<template>
  <p-content>
    <template v-if="schema.properties">
      <SchemaProperty :values :schema :kinds>
        <template #default="scope">
          <slot v-bind="scope" />
        </template>
      </SchemaProperty>
    </template>

    <slot name="after-content" />
  </p-content>
</template>

<script lang="ts" setup>
  import { VNode } from 'vue'
  import SchemaProperty from '@/schemas/components/SchemaProperty.vue'
  import { Schema } from '@/schemas/types/schema'
  import { PrefectKind, SchemaValues } from '@/schemas/types/schemaValues'

  const { schema, values, kinds } = defineProps<{
    schema: Schema,
    values: SchemaValues,
    kinds: PrefectKind[],
  }>()


  defineSlots<{
    default: (props: { kind: PrefectKind }) => VNode,
    'after-content': () => VNode,
  }>()
</script>