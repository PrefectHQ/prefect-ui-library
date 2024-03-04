<template>
  <component :is="element" class="schema-form-property-object">
    <SchemaFormProperties v-model:values="values" :parent="property" :properties="property.properties ?? {}" :errors="errors" />
  </component>
</template>

<script lang="ts" setup>
  import { isDefined } from '@prefecthq/prefect-design'
  import { computed, inject, provide } from 'vue'
  import SchemaFormProperties from '@/schemas/components/SchemaFormProperties.vue'
  import { schemaPropertyObjectDepthSymbol } from '@/schemas/symbols'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { PrefectKindJson, SchemaValues } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { isNullish } from '@/utilities'
  import { asJson } from '@/utilities/types'

  const props = defineProps<{
    property: SchemaProperty & { type: 'object' },
    values: SchemaValues | undefined,
    errors: SchemaValueError[],
  }>()

  const depth = inject(schemaPropertyObjectDepthSymbol, 0)

  provide(schemaPropertyObjectDepthSymbol, depth + 1)

  const emit = defineEmits<{
    'update:values': [SchemaValues | undefined],
  }>()

  if (isNullish(props.property.properties)) {
    const valueOrDefaultValue = isDefined(props.values) ? props.values : props.property.default

    const json: PrefectKindJson = {
      __prefect_kind: 'json',
      value: asJson(valueOrDefaultValue),
    }

    emit('update:values', json)
  }

  const element = computed(() => {
    if (depth === 0) {
      return 'div'
    }

    return 'p-card'
  })

  const values = computed({
    get() {
      return props.values
    },
    set(values) {
      emit('update:values', values)
    },
  })
</script>